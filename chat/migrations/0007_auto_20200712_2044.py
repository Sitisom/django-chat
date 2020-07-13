# Generated by Django 2.2 on 2020-07-12 20:44

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('chat', '0006_auto_20181201_1421'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('role', models.PositiveSmallIntegerField(choices=[(0, 'Student'), (1, 'Teacher')])),
                ('subject', models.PositiveSmallIntegerField(choices=[(0, 'Math'), (1, 'Chemistry'), (2, 'Physics'), (3, 'English')])),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='contact',
            name='friends',
        ),
        migrations.AddField(
            model_name='chat',
            name='chatname',
            field=models.CharField(default='old', max_length=150, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='contact',
            name='chats',
            field=models.ManyToManyField(blank=True, related_name='_contact_chats_+', to='chat.Contact'),
        ),
        migrations.AlterField(
            model_name='chat',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='contacts', to='chat.Contact'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contacts', to='chat.User'),
        ),
    ]