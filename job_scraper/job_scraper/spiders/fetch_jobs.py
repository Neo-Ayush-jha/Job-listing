from datetime import datetime
import requests

headers = {
    'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
}

params = {
    'q': 'Software',
    'countryCode2': 'US',
    'radius': '30',
    'radiusUnit': 'mi',
    'page': '1',
    'pageSize': '20',
    'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
    'filters.workplaceTypes': 'Remote',
    'filters.employmentType': 'CONTRACTS',
    'filters.postedDate': 'ONE',
    'currencyCode': 'USD',
    'fields': 'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
    'culture': 'en',
    'recommendations': 'true',
    'interactionId': '0',
    'fj': 'true',
    'includeRemote': 'true',
}

django_api_url = "http://127.0.0.1:8000/api/jobs/add/"

response = requests.get(
    'https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search',
    params=params,
    headers=headers
)

if response.status_code == 200:
    data = response.json()
    jobs = data.get('data', [])

    print(f"Found {len(jobs)} jobs to upload.")

    for job in jobs:
        posted_date = job.get('postedDate')

        posted_at = None
        if posted_date:
            try:
                posted_at = datetime.fromisoformat(posted_date.replace('Z', '+00:00'))
            except ValueError:
                posted_at = None

        if posted_at:
            posted_at = posted_at.strftime('%Y-%m-%dT%H:%M:%S')  

        job_data = {
            'id': job.get('id'),
            'job_id': job.get('jobId'),
            'guid': job.get('guid'),
            'summary': job.get('summary'),
            'title': job.get('title', 'Unknown Title'),
            'posted_at': posted_at,
            'modified_date': job.get('modifiedDate'),
            'location': job.get('jobLocation', {}).get('displayName', 'Unknown Location'),
            'apply_link': job.get('detailsPageUrl', '')[:2000], 
            'salary': job.get('salary', 'Not Provided'),
            'company_page_url': job.get('companyPageUrl', ''),
            'company_logo_url': job.get('companyLogoUrl', ''),
            'company_logo_url_optimized': job.get('companyLogoUrlOptimized', ''),
            'position_id': job.get('positionId'),
            'company_name': job.get('companyName', 'Unknown Company'),
            'employment_type': job.get('employmentType', '').lower(),
            'is_highlighted': job.get('isHighlighted', False),
            'score': job.get('score'),
            'easy_apply': job.get('easyApply', False),
            'employer_type': job.get('employerType', 'Unknown'),
            'work_from_home_availability': job.get('workFromHomeAvailability', False),
            'workplace_types': str(job.get('workplaceTypes', 'Unknown')),  
            'is_remote': job.get('isRemote', False),
            'debug': job.get('debug', ''),
            'job_metadata': job.get('jobMetadata', ''),
            'willing_to_sponsor': job.get('willingToSponsor', False),
        }



        # POST the job data to the Django backend
        backend_response = requests.post(django_api_url, json=job_data)

        if backend_response.status_code == 201:
            print(f"Job '{job_data['title']}' added successfully.")
        else:
            print(f"Failed to add job '{job_data['title']}': {backend_response.text}")
else:
    print(f"Failed to fetch jobs from API. Status code: {response.status_code}")
    print(response.text)
