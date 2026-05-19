#!/usr/bin/env python3
"""
Backend API Testing Script for Portfolio Website
Tests all FastAPI endpoints and MongoDB connectivity
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://ayush-dev-portfolio.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

def test_backend_connectivity():
    """Test if backend server is accessible"""
    print("=" * 60)
    print("TESTING BACKEND CONNECTIVITY")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BACKEND_URL}/docs", timeout=10)
        if response.status_code == 200:
            print("✅ Backend server is accessible")
            print(f"   URL: {BACKEND_URL}")
            return True
        else:
            print(f"❌ Backend server returned status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to backend: {e}")
        return False

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n" + "=" * 60)
    print("TESTING ROOT ENDPOINT: GET /api/")
    print("=" * 60)
    
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print(f"❌ Unexpected response: {data}")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        return False

def test_post_status_endpoint():
    """Test POST /api/status endpoint"""
    print("\n" + "=" * 60)
    print("TESTING POST STATUS ENDPOINT: POST /api/status")
    print("=" * 60)
    
    test_data = {
        "client_name": "Portfolio Test Client"
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Request Data: {test_data}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ POST status endpoint working correctly")
                    return True, data["id"]
                else:
                    print(f"❌ Client name mismatch: expected {test_data['client_name']}, got {data['client_name']}")
                    return False, None
            else:
                missing_fields = [field for field in required_fields if field not in data]
                print(f"❌ Missing required fields: {missing_fields}")
                return False, None
        else:
            print(f"❌ POST status endpoint failed with status {response.status_code}")
            print(f"Response text: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, None
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        return False, None

def test_get_status_endpoint():
    """Test GET /api/status endpoint"""
    print("\n" + "=" * 60)
    print("TESTING GET STATUS ENDPOINT: GET /api/status")
    print("=" * 60)
    
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2, default=str)}")
            
            if isinstance(data, list):
                print(f"✅ GET status endpoint working correctly (returned {len(data)} items)")
                
                # Validate structure of returned items
                if data:  # If there are items, validate the first one
                    first_item = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    if all(field in first_item for field in required_fields):
                        print("✅ Status check items have correct structure")
                        return True
                    else:
                        missing_fields = [field for field in required_fields if field not in first_item]
                        print(f"❌ Status check items missing fields: {missing_fields}")
                        return False
                else:
                    print("✅ GET status endpoint working (empty list)")
                    return True
            else:
                print(f"❌ Expected list response, got: {type(data)}")
                return False
        else:
            print(f"❌ GET status endpoint failed with status {response.status_code}")
            print(f"Response text: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print("\n" + "=" * 60)
    print("TESTING CORS CONFIGURATION")
    print("=" * 60)
    
    try:
        # Test preflight request
        headers = {
            'Origin': 'https://example.com',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        response = requests.options(f"{API_BASE_URL}/status", headers=headers, timeout=10)
        print(f"OPTIONS Status Code: {response.status_code}")
        print(f"CORS Headers: {dict(response.headers)}")
        
        # Check for CORS headers
        cors_headers = {
            'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
            'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
            'access-control-allow-headers': response.headers.get('access-control-allow-headers')
        }
        
        print(f"CORS Configuration: {cors_headers}")
        
        if cors_headers['access-control-allow-origin']:
            print("✅ CORS is configured")
            return True
        else:
            print("❌ CORS headers not found")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CORS test failed: {e}")
        return False

def test_mongodb_connectivity():
    """Test MongoDB connectivity by checking if data persists"""
    print("\n" + "=" * 60)
    print("TESTING MONGODB CONNECTIVITY")
    print("=" * 60)
    
    # Create a unique test entry
    test_client_name = f"MongoDB Test {datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Post data
    post_success, created_id = test_post_status_endpoint_for_mongodb(test_client_name)
    if not post_success:
        print("❌ Failed to create test data for MongoDB test")
        return False
    
    # Retrieve data and verify it exists
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=10)
        if response.status_code == 200:
            data = response.json()
            
            # Look for our test entry
            found_entry = None
            for entry in data:
                if entry.get("client_name") == test_client_name:
                    found_entry = entry
                    break
            
            if found_entry:
                print(f"✅ MongoDB connectivity working - data persisted")
                print(f"   Created entry: {found_entry}")
                return True
            else:
                print(f"❌ MongoDB connectivity issue - test data not found")
                print(f"   Looking for: {test_client_name}")
                print(f"   Available entries: {[entry.get('client_name') for entry in data]}")
                return False
        else:
            print(f"❌ Failed to retrieve data for MongoDB test: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ MongoDB connectivity test failed: {e}")
        return False

def test_post_status_endpoint_for_mongodb(client_name):
    """Helper function for MongoDB test"""
    test_data = {"client_name": client_name}
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            return True, data.get("id")
        else:
            return False, None
            
    except Exception:
        return False, None

def run_all_tests():
    """Run all backend tests"""
    print("🚀 STARTING PORTFOLIO WEBSITE BACKEND TESTS")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base URL: {API_BASE_URL}")
    
    test_results = {}
    
    # Test 1: Backend Connectivity
    test_results['connectivity'] = test_backend_connectivity()
    
    # Test 2: Root Endpoint
    test_results['root_endpoint'] = test_root_endpoint()
    
    # Test 3: POST Status Endpoint
    test_results['post_status'], _ = test_post_status_endpoint()
    
    # Test 4: GET Status Endpoint
    test_results['get_status'] = test_get_status_endpoint()
    
    # Test 5: CORS Configuration
    test_results['cors'] = test_cors_configuration()
    
    # Test 6: MongoDB Connectivity
    test_results['mongodb'] = test_mongodb_connectivity()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed_tests = sum(1 for result in test_results.values() if result)
    total_tests = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.upper().replace('_', ' ')}: {status}")
    
    print(f"\nOverall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED - Backend is working correctly!")
        return True
    else:
        print("⚠️  SOME TESTS FAILED - Backend needs attention")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)