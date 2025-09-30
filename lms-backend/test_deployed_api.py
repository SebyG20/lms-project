import requests

def test_api_health():
    url = "https://lms-backend-qeui.onrender.com/api/health/"
    response = requests.get(url)
    assert response.status_code == 200
    assert response.json().get("status") == "ok"

def test_students_list():
    url = "https://lms-backend-qeui.onrender.com/api/students/"
    response = requests.get(url)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

if __name__ == "__main__":
    test_api_health()
    print("API health endpoint OK")
    test_students_list()
    print("API students endpoint OK")
