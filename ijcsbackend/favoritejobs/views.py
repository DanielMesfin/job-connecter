from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Job,Favorite,JobSeeker
from Job.serializer import JobSerializer
from .serializer import FavouritiesJobSerializer

@csrf_exempt
def toggle_favorite(request):
    if request.method == "POST":
        job_seeker_id = request.POST.get("jobseeker_id")
        job_id = request.POST.get("job_id")

        job = Job.objects.get(pk=job_id)
        job_seeker = JobSeeker.objects.get(pk=job_seeker_id)

        try:
            favorite = Favorite.objects.get(job=job, job_seeker=job_seeker)
            favorite.delete()
        except Favorite.DoesNotExist:
            favorite = Favorite.objects.create(job=job, job_seeker=job_seeker)

        # Return the updated job as JSON response
        return JsonResponse({"job": JobSerializer(job).data})

    return JsonResponse({"error": "Invalid request method"})
@csrf_exempt
def get_favorite_jobs(request):
    try:
        favorite_jobs = Favorite.objects.all()
        serialized_favorite_jobs = FavouritiesJobSerializer(favorite_jobs, many=True).data
        return JsonResponse({"serialized_favorite_jobs":serialized_favorite_jobs})
    except Job.DoesNotExist:
        return JsonResponse({"error": "No jobs found"}, status=404)
@csrf_exempt
def get_favorite_job_by_id(request, favorite_id):
    try:
        favorite_job_by_id = Favorite.objects.filter(id=favorite_id)
        serialized_job_by_id = FavouritiesJobSerializer(favorite_job_by_id, many=True).data
        return JsonResponse({"":serialized_job_by_id})
    except Favorite.DoesNotExist:
        return JsonResponse({"error": "No favorite jobs found"}, status=404)