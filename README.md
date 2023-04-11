# Neo4j Fullstack CRUD

```bash
docker run \
    --env=NEO4J_AUTH=none \
    --env=NEO4J_apoc_export_file_enabled=true \
    --env=NEO4J_apoc_import_file_enabled=true \
    --env=NEO4J_apoc_import_file_use__neo4j__config=true \
    --env=NEO4J_PLUGINS=\[\"apoc\"\] \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j
```

```bash
cp .env.example .env
```

```bash
nx run-many --target=serve --all
```

![Demo](demo.gif)
