import shutil
import os

# Path to your project's echoshell directory
source_dir = "echoshell"

# Automatically find the XAMPP htdocs directory
possible_directories = ["/xampps/htdocs", "/xampps/xamppfiles/htdocs", "/Applications/XAMPP/htdocs","/xampp/htdocs", "/xampp/xamppfiles/htdocs"]
xampp_htdocs = next((d for d in possible_directories if os.path.exists(d)), None)

if xampp_htdocs is None:
    print("XAMPP htdocs directory not found.")
    exit()

# Destination directory
dest_dir = os.path.join(xampp_htdocs, "echoshell")

# Ensure the destination directory exists
os.makedirs(dest_dir, exist_ok=True)

# Clear out the destination directory
for file_name in os.listdir(dest_dir):
    file_path = os.path.join(dest_dir, file_name)
    try:
        if os.path.isfile(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    except Exception as e:
        print(f"Failed to delete {file_path}. Reason: {e}")

# Copy files
for file_name in os.listdir(source_dir):
    source_path = os.path.join(source_dir, file_name)
    dest_path = os.path.join(dest_dir, file_name)
    try:
        if os.path.isfile(source_path):
            shutil.copy2(source_path, dest_path)
            print(f"Copied: {source_path} to {dest_path}")
        elif os.path.isdir(source_path):
            shutil.copytree(source_path, dest_path)
            print(f"Copied directory: {source_path} to {dest_path}")
    except Exception as e:
        print(f"Failed to copy {source_path}. Reason: {e}")

print("Deployment completed.")
