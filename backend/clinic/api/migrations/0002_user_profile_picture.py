# Generated by Django 4.2.1 on 2023-05-25 13:10

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(null=True, upload_to=api.models.user_profile_picture_path),
        ),
    ]