# Generated by Django 4.2.7 on 2023-11-18 15:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_event_alter_medication_patient_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicationhistory',
            name='taken',
        ),
    ]