# **Workspace Setup**

This repository provides a development environment that can be easily deployed using **Docker**.

## **🚀 Quick Start**

### **1️⃣ Install Required Tools**

Before starting, install the following tools:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Verify the installation with the following commands:

```sh
docker --version
```

```sh
docker-compose --version
```

### **2️⃣ Clone the Repository**

Clone this repository to your local machine:

```sh
git clone <repository-url>
cd <repository-name>
```

Replace `<repository-url>` with the actual URL of the repository.

### **3️⃣ Add Containers to /etc/hosts**

To properly resolve container names, add the following entries to your `/etc/hosts` file (Linux/macOS) or `C:\Windows\System32\drivers\etc\hosts` file (Windows):

```sh
127.0.0.1    campaign.workspace
127.0.0.1    campaign.postgres
```

On Windows, you may need to open Notepad as Administrator to modify the `hosts` file.

---

## **🛠 Resolving Port 5432 Issues**

If **port 5432 is already in use**, it must be freed before running Docker containers.

### **🔹 Linux (Ubuntu, Debian, CentOS, Arch)**

#### **1. Check what is using port 5432**

```sh
sudo lsof -i :5432
```

or

```sh
netstat -tulnp | grep 5432
```

This will display the PID of the process using the port.

#### **2. Kill the process using the port**

```sh
sudo kill -9 <PID>
```

(Replace `<PID>` with the actual process ID)

#### **3. Restart Docker**

```sh
sudo systemctl restart docker
```

---

### **🔹 macOS**

#### **1. Check which process is using the port**

```sh
lsof -i :5432
```

#### **2. Stop PostgreSQL if running**

```sh
brew services stop postgresql
```

or

```sh
pg_ctl -D /usr/local/var/postgres stop
```

#### **3. Kill the process manually if needed**

```sh
kill -9 <PID>
```

#### **4. Restart Docker**

```sh
docker-compose down
docker-compose up --build -d
```

---

### **🔹 Windows (WSL & Docker Desktop)**

#### **1. Check what is using the port**

```powershell
netstat -ano | findstr :5432
```

If you see output like:

```
TCP    0.0.0.0:5432    0.0.0.0:0    LISTENING    12345
```

The last number (**12345**) is the **PID** of the process.

#### **2. Kill the process**

```powershell
taskkill /PID 12345 /F
```

#### **3. If the issue is with Docker, stop the containers**

```sh
docker ps -q --filter "publish=5432" | xargs -r docker stop
docker ps -q --filter "publish=5432" | xargs -r docker rm -f
```

#### **4. Restart Docker Desktop**

Exit Docker Desktop and restart it.

---

## **💻 Instructions for Windows, macOS, and Linux**

### **4️⃣ Start the Environment**

Start the containers using:

```sh
docker-compose up --build -d
```

> `-d` runs the containers in the background.

If you encounter **"bind: address already in use"** error due to occupied **port 5432**, **free the port before restarting**.

---

## **🛠 Container Management Commands**

🔍 **View running containers:**

```sh
docker ps
```

📝 **View container logs:**

```sh
docker-compose logs -f
```

💻 **Access a container:**

```sh
docker exec -it <container_name> /bin/sh
```

(Replace `<container_name>` with your container's name)

🔄 **Restart containers:**

```sh
docker-compose restart
```

🪚 **Remove all containers and volumes:**

```sh
docker-compose down -v
```

💡 **Now your workspace is ready to use!** 🎉

- [campaign.workspace](http://localhost:3000/)
- [campaign.postgres](http://localhost:5432/)

---

## **🛠 Additional Configuration**

If you need to modify the environment configuration, edit the `docker-compose.yml` file.

After making changes, restart the containers:

```sh
docker-compose up --build -d
```

---
