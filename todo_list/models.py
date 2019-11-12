from django.conf import settings
from django.db import models

# Create your models here.
class Task(models.Model):
    created_by=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name=models.CharField(max_length=200)
    completed=models.BooleanField('Completed')

    def __str__(self):
        return self.name
