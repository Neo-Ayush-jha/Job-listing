from django.db import models

class Job(models.Model):
    job_id = models.TextField(blank=True, null=True)
    guid = models.TextField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255) 
    posted_at = models.DateTimeField()
    modified_date = models.DateTimeField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    apply_link = models.TextField(blank=True, null=True)
    salary = models.TextField(blank=True, null=True)
    company_page_url = models.TextField(blank=True, null=True)
    company_logo_url = models.TextField(blank=True, null=True)
    company_logo_url_optimized = models.TextField(blank=True, null=True)
    position_id = models.TextField(blank=True, null=True)
    company_name = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=50, choices=[
        ('full-time', 'Full-Time'),
        ('part-time', 'Part-Time'),
        ('contract', 'Contract')
    ], blank=True, null=True)
    is_highlighted = models.BooleanField(default=False)
    score = models.FloatField(blank=True, null=True)
    easy_apply = models.BooleanField(default=False)
    employer_type = models.TextField(blank=True, null=True)
    work_from_home_availability = models.BooleanField(default=False)
    workplace_types = models.TextField(blank=True, null=True)
    is_remote = models.BooleanField(default=False)
    debug = models.TextField(blank=True, null=True)
    job_metadata = models.TextField(blank=True, null=True)
    willing_to_sponsor = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Job"
        verbose_name_plural = "Jobs"
