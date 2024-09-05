import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from application.models import Application
from Job.models import Job
from application.serializers import ApplicationSerializer
from jobseeker.serializers import JobSeekerSerializer4ApplicantDetail
from jobseeker.models import JobSeeker
from django.core.serializers import serialize

def get_job_recommendations(job_seeker):
    job_postings = Job.objects.all()
    # Combine job_seeker skills and required skills into a list of strings
    skills_corpus = [job_seeker.skills] + list(job_postings.values_list('required_skill', flat=True))
    skills_corpus = [' '.join(skill) for skill in skills_corpus]  
    print("from oldd")
    print(skills_corpus)
    vectorizer = CountVectorizer().fit_transform(skills_corpus)
    cosine_similarities = cosine_similarity(vectorizer)

    job_seeker_index = 0  
    scores = cosine_similarities[job_seeker_index][1:]  
    similarity_threshold = 0.7
    recommended_jobs = [job for job, score in zip(job_postings, scores) if score >= similarity_threshold][:5]
    return recommended_jobs

def get_job_seeker_recommendations(job_id):
    job=Job.objects.get(id=job_id)
    job_application = list(Application.objects.all().filter(job_id=job.id).values()) 
    job_required_skills = job.required_skill
    recommended_job_seeker=[]
    applicant = []
    recommend_application=[]
    for app in job_application:
        job_applicant=JobSeeker.objects.all().filter(id=app['job_seeker_id']).values()
        applicant.append(job_applicant)
    
    for app in applicant:
        for each_skill in job_required_skills:       
            skills_corpus = [[each_skill]] + list(rq[0]['skills'] for rq in applicant)
            skills_corpus = [' '.join(skill) for skill in skills_corpus]  
            vectorizer = CountVectorizer().fit_transform(skills_corpus)
            cosine_similarities = cosine_similarity(vectorizer)
            scores = cosine_similarities[0][1:]  
            similarity_threshold = 0.7
            # print(scores)
            recommended_job_seeker.extend([job for job, score in zip(app.values(), scores) if score >= similarity_threshold][:5])
    for job_seeker in recommended_job_seeker:
        appn=Application.objects.all().filter(job=job_id,job_seeker=job_seeker['id']).values()
         
        recommend_application.append(
            # "application":appn[0]
            appn[0]
              
            # {app[0]}
            # "job_seeker":job_seeker,
            # "recommended":True
        ) 
    return recommend_application

    
def calculate_similarity(user, job):
    user_vector = [user.skills, user.location]
    job_vector = [job.required_skill, job.location]
    similarity = cosine_similarity(user_vector, job_vector)
    return similarity
 
def recommend_similar_jobs(selected_job_id):
    selected_job_id = int(selected_job_id)
    selected_job = Job.objects.get(id=selected_job_id)
    all_jobs = Job.objects.exclude(id=selected_job_id)
    selected_job_skills = " ".join(selected_job.required_skill)
    all_job_skills = [" ".join(job.required_skill) for job in all_jobs]
    # Combine selected job skills with all other job skills
    job_descriptions = [selected_job_skills] + all_job_skills
    vectorizer = TfidfVectorizer().fit(job_descriptions)
    vectorized_descriptions = vectorizer.transform(job_descriptions)
    # Convert csr_matrix to a dense NumPy array
    vectorized_descriptions_array = vectorized_descriptions[1:].toarray()
    # Calculate cosine similarity between selected job and all other jobs
    similarity_scores = cosine_similarity(vectorized_descriptions[0].toarray(), vectorized_descriptions_array).flatten()
    # Sort jobs based on similarity scores
    sorted_indices = similarity_scores.argsort()[::-1]
    similarity_threshold = 0.7
    recommended_jobs = [job for job, score in zip(all_jobs, sorted_indices) if score >= similarity_threshold][:5]
    return recommended_jobs




def get_job_recommendations_for_each_skill(job_seeker):
    job_postings = Job.objects.all()
    # Combine job_seeker skills and required skills into a list of strings
    recommended_jobs=[]
    for each_skill in job_seeker.skills:
        skills_corpus = [[each_skill]] + list(job_postings.values_list('required_skill', flat=True))
        skills_corpus = [' '.join(skill) for skill in skills_corpus]  
        vectorizer = CountVectorizer().fit_transform(skills_corpus)
        cosine_similarities = cosine_similarity(vectorizer)

        job_seeker_index = len(recommended_jobs)
        scores = cosine_similarities[job_seeker_index][1:]  
        similarity_threshold = 0.7
        
        recommended_jobs.extend([job for job, score in zip(job_postings, scores) if score >= similarity_threshold][:5])
    return recommended_jobs





# def get_job_seeker_recommendations(job_id):
#     job=Job.objects.get(id=job_id)
#     job_application = list(Application.objects.all().filter(job_id=job.id).values()) 
#     job_required_skills = job.required_skill
#     recommended_job_seeker=[]
#     applicant = []
#     for app in job_application:
#         job_applicant=JobSeeker.objects.all().filter(id=app['job_seeker_id']).values()
#         applicant.append(job_applicant)
#     for app in applicant:
#         for each_skill in job_required_skills:
#             print(app[0]['skills'])
#             skills_corpus = [[each_skill]] + list(rq[0]['skills'] for rq in applicant)
#             print()
#             print("skill corpus")
#             print(skills_corpus)
#             skills_corpus = [' '.join(skill) for skill in skills_corpus]  
#             vectorizer = CountVectorizer().fit_transform(skills_corpus)
#             cosine_similarities = cosine_similarity(vectorizer)
#             job_seeker_index = len(applicant)
#             scores = cosine_similarities[job_seeker_index][1:]  
#             similarity_threshold = 0.7
#             print(scores)
#             recommended_job_seeker.extend([job for job, score in zip(applicant[0].values(), scores) if score >= similarity_threshold][:5])
#     return recommended_job_seeker