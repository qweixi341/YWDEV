# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userCust', '0002_auto_20151101_1806'),
    ]

    operations = [
        migrations.RenameField(
            model_name='myuser',
            old_name='mobile',
            new_name='username',
        ),
    ]
