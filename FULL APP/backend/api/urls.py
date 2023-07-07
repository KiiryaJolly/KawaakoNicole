from django.urls import path
from . import views

urlpatterns = [
    path("task-create/", views.taskCreate, name="task-create"),
    path("task-list/", views.taskList, name="task-list"),
    path("task-list/<str:owner>/", views.ownerTasks, name="owner-tasks"),
    path("task-details/<str:pk>", views.taskDetails, name="task-details"),
    path("task-update/<str:id>/", views.taskUpdate, name="task-update"),
    path("task-delete/<str:id>/", views.taskDelete, name="task-delete"),
    path("signup/", views.userCreate, name="user-create"),
    path("login/", views.users, name="users")
    
]