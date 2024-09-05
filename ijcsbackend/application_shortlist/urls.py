from django.urls import path
from .views import  *
from .views import Add_appTo_shortlist
urlpatterns = [
  path('add-to-shortlist/<int:app_id>/',Add_appTo_shortlist.as_view(),name="addto-shortlist"),
  path('remove-from-shortlist/<int:app_id>/',Remove_from_shortlist.as_view(),name="addto-shortlist"),
  path('check-app-shortlist/<int:app_id>/',ShortlistedApplications.as_view(),name="check-app-shortlist"),
]