def find_project_data(yield_rates, project_name):
    for project in yield_rates:
        if project['project'].lower() == project_name.lower():
            return project
    return None
