import json
from django.http import JsonResponse
from django.core.serializers import serialize
from Job.models import Job
from django.core.serializers import serialize
from application.models import Application
from .recommendation_system import calculate_similarity, get_job_recommendations, get_job_recommendations_for_each_skill, get_job_seeker_recommendations, recommend_similar_jobs
from jobseeker.models import JobSeeker
def recommend_jobs(request, job_seeker_id):
    job_seeker = JobSeeker.objects.get(id=job_seeker_id)
    job_recommendations = get_job_recommendations(job_seeker)
    return JsonResponse({'recommendations': json.loads(serialize('json', job_recommendations))})

def recommend_jobs_o(request,_id):
    jobs = Job.objects.all()
    user = JobSeeker.objects.get(id=_id)
    job_similarities = [(job, calculate_similarity(user, job)) for job in jobs]
    job_similarities.sort(key=lambda x: x[1], reverse=True)
    recommended_jobs = [job for job, similarity in job_similarities]
    return recommended_jobs

def recommend_job_seekers(request, job_id):
    job_seeker_recommendations = get_job_seeker_recommendations(job_id)
    print(job_seeker_recommendations)
    return JsonResponse( job_seeker_recommendations,safe=False)

def fetch_simmilar_job(requset, selectedJobId):
    recommened_job_list= recommend_similar_jobs(selectedJobId)
    # return JsonResponse({'recommened_job_list':  recommened_job_list})

    return JsonResponse({'recommened_job_list': json.loads(serialize('json', recommened_job_list))})
def recommend_jobs_for_each_skill(request, job_seeker_id):
    job_seeker = JobSeeker.objects.get(id=job_seeker_id)
    job_recommendations = get_job_recommendations_for_each_skill(job_seeker)
    return JsonResponse({'recommendations': json.loads(serialize('json', job_recommendations))})
