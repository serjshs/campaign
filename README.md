# Workspace Setup

This repository contains a workspace environment that can be easily deployed using Docker.

## 🚀 Quick Start

### 1️⃣ Install Required Tools

Before you begin, make sure you have installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Check the installation with the following commands:

```sh
docker --version
```

```sh
docker-compose --version
```

### 2️⃣ Start the Environment

Before starting the environment, copy the environment configuration:
```sh
cp .env.workspace .env
```

Start the containers using:

```sh
docker-compose up --build -d
```

The `-d` flag runs the containers in the background.

### 3️⃣ Stop the Environment

To stop the running containers, execute:

```sh
docker-compose down
```

## 🛠 Commands for Managing Containers

🔍 **View running containers:**

```sh
docker ps
```

📜 **View container logs:**

```sh
docker-compose logs -f
```

💻 **Access a container:**

```sh
docker exec -it <container_name> /bin/sh
```

(Replace `<container_name>` with your container's name)

📦 **Restart containers:**

```sh
docker-compose restart
```

🧹 **Remove all containers and volumes:**

```sh
docker-compose down -v
```

## 🔧 Additional Configuration

If you need to modify the environment configuration, edit the `docker-compose.yml` file.

After making changes, restart the containers:

```sh
docker-compose up --build -d
```

---

Now your workspace is ready to use! 🎉
