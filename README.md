# growthpillars

## Setup ##

### Create Virtualenv wrapper and Activate ###
Do this wherever you plan on storing your project. For me, it's in ~/projects/
```sh
cd ~/projects
virtualenv venv-gp
source venv-gp/bin/activate
```

### Clone the code ###
```sh
cd venv-gp
git clone https://github.com/willietran/growthpillars.git
```

### Install requirements ###
```sh
cd growthpillars
pip install --allow-external pil --allow-unverified pil -r requirements.txt
```

### Create Database ###
Instructions goes here

### Database Migration ###
```sh
foreman run python manage.py migrate
```

## Front-end requirements ##


## Local Dev ##

To do local development, the DATABASE_URL env var needs to be set. If there is
a locally running postgres instance where the db name is 'foo',
'postgres://localhost/foo' is sufficient.

To test the server, use `foreman run python manage.py runserver`, and make sure
python points to the venv python (e.g. `./venv/bin/python`).

To test prod settings, set the GROWTH_PRODUCTION environment variable. To
*really* test prod settings, also use `foreman start` instead of using
manage.py - this will run the django server using gunicorn.
