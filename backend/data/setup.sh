# linux majabra
#!/bin/bash

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "Setup complete!"

# sudo pip install pipreqs