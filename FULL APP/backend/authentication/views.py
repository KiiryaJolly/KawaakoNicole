from django.shortcuts import render
from rest_framework import generics, status, views
from .serializers import RegisterSerializer, EmailVerificationSerializer, LoginSerializer
from rest_framework.response import Response
from .models import User
from .utils import Util
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse


# Sendgrid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# To help us decode the token when the user clicks the link sent to their email
import jwt

# This will give us access to the secret key which we use to decode the token
from django.conf import settings



class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True) # runs the validate method in the serializer
        serializer.save() # runs the create method in the serializer
        user_data = serializer.data
        
        user = User.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        
        current_site = get_current_site(request).domain
        relativeLink = reverse('verify')
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = 'Hi '+user.username+' <br> Use the link below to verify your email <br>'+absurl

        message = Mail(
                from_email='benjaminjjumba@gmail.com',
                to_emails=user.email,
                subject='Verify your email',
                html_content=email_body
        )
        sg = SendGridAPIClient('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')
        sg.send(message)
        
        return Response(user_data, status=status.HTTP_201_CREATED)



class VerifyEmail(views.APIView):
    serializer = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=["HS256"])
            
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Account Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
# class LoginAPIView(generics.GenericAPIView):
    
#     def post(self, request):

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
    