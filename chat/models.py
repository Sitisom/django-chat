# from django.contrib.auth.models import User as authUser
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

# class User(authUser):
#     ROLE_CHOICES = (
#         (0, 'Student'),
#         (1, 'Teacher'),
#     )
#     SUBJECT_CHOICES = (
#         (0, 'Math'),
#         (1, 'Chemistry'),
#         (2, 'Physics'),
#         (3, 'English')
#     )
#     role = models.PositiveSmallIntegerField(
#         choices=ROLE_CHOICES, blank=True, null=True)
#     subject = models.PositiveSmallIntegerField(
#         choices=SUBJECT_CHOICES, blank=True, null=True
#     )
#     chats = models.ManyToManyField('self', blank=True)

#     def __str__(self):
#         return self.username


class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)
    chats = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Chat(models.Model):
    chatname = models.CharField(max_length=150, blank=True, null=True)
    participants = models.ManyToManyField(
        User, related_name='contacts', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return "{}".format(self.pk)
