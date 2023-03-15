## Project Structure

Each package has its own router, schemas, models, etc.

<pre>
. <br>
├── router.py       # core of each module with all the endpoints 
├── schemas.py      # for pydantic models
├── models.py       # for db models
├── service.py      # module specific business logic
├── dependencies.py # router dependencies
├── constants.py    # module specific constants and error codes
├── config.py       # e.g. env vars
├── utils.py        # non-business logic functions
├── exceptions      # module specific exceptions
└── [other_name.py] # module tailor made business logic
</pre>

## Update requirements

#### update pip locally

```
python3 -m pip install --upgrade --force-reinstall pip
```

#### install pip-tools

```
pip install pip-tools
```
#### cd into requirements folder
```
cd ./services/backend
```

#### run pip-compile locally to set up dev requirements

```
pip-compile --no-emit-options --output-file=requirements/dev.txt requirements/dev.in
```

#### run pip-compile locally to set up prod requirements

```
pip-compile --no-emit-options --output-file=requirements/prod.txt requirements/prod.in
```

## Common commands

### Code Quality

#### run flake8

```
docker compose exec backend flake8 .
```

#### run black

```
docker compose exec backend black .
```

#### run isort
```
docker compose exec backend isort .
```

### Testing

#### normal run

```
docker compose exec backend python -m pytest
```

#### specific file and function with logging and without error description

```
docker compose exec backend python -m pytest "tests/functional/test_pool.py" -k "test_pool" -s --tb=no
```

#### with coverage

```
docker compose exec backend python -m pytest --cov="."
```

#### disable warnings

```
docker-compose exec backend python -m pytest -p no:warnings
```

### Debug

#### access bash

```
docker exec -it backend bash
```
