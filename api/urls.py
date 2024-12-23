from django.urls import path
from .views import *

urlpatterns = [
    path('jobs/', get_jobs),
    path('jobs/add/', add_job),
    path('jobs/<int:id>/', get_job, name='get_job'),
]
