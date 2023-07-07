# from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type # pip install six
# from .models import UserAccount

# class AppTokenGenerator(PasswordResetTokenGenerator):
    
#     def _make_hash_value(self, user: UserAccount, timestamp: int) -> str:
#         return text_type(user.active)+text_type(user.pk)+text_type(timestamp)
    

# token_generator = AppTokenGenerator()