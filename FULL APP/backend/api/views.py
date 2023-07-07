from http.client import HTTPResponse
from django.shortcuts import render, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task, UserAccount
from .serializers import TaskSerializer, UserAccountSerializer

# Create your views here.


# For all tasks in the database
@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

# For tasks belonging to an individual person

@api_view(['GET'])
def ownerTasks(request, owner):
    tasks = Task.objects.filter(owner=owner)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



# To ge details of a specific task
@api_view(['GET'])
def taskDetails(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)

# For deleting a task
@api_view(['DELETE'])
def taskDelete(request, id):
    task = Task.objects.get(id=id)
    task.delete()
    return Response('Deleted successfully....')


# For creating a task and adding it to the tasks already in the datavbase
@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# For updating the details of an individual task
@api_view(['POST'])
def taskUpdate(request, id):
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



# For creating a user account and saving the details in the database
@api_view(['POST', 'GET'])
def userCreate(request):
    serializer = UserAccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def users(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username, password)
    else:
        
        users = UserAccount.objects.all()
        #  tasks = Task.objects.all()
        serializer = UserAccountSerializer(users, many=True)
        return Response(serializer.data)




# COde starts here

# from rest_framework import generics, permissions
# from rest_framework.response import Response
# from knox.models import AuthToken
# from .serializers import UserSerializer, RegisterSerializer

# # Register API
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#         "user": UserSerializer(user, context=self.get_serializer_context()).data,
#         "token": AuthToken.objects.create(user)[1]
#         })


