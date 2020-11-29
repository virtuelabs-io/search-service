export class TestData {
  static gig = {
    "category": "GND",
    "subCatL1": "GND_LD",
    "subCatL2": "GND_LD_DL",
    "datePublished": "2020-09-29",
    "reviewed": false,
    "enabled": false,
    "ref": "",
    "title": "Create New Gig",
    "description": "",
    "startingPrice": 25.87,
    "currency": "USD",
    "tags": [
      "minimalist",
      "logo",
      "flat"
    ],
    "displayImages": [
      "image_url_1",
      "image_url_2",
      "image_url_3",
      "image_url_4",
      "image_url_5"
    ],
    "options": {
      "logoStyle": {
        "minimalist": false,
        "free_style": true,
        "mascot": false,
        "3d": false
      },
      "fileFormats": {
        "ai": true,
        "jpg": true,
        "png": true,
        "svg": true,
        "eps": true,
        "psd": true,
        "pdf": true
      },
      "servicesIncluded": {
        "source_file": true,
        "logo_transparency": true,
        "high_resolution": true,
        "3d_mockup": true,
        "stationery_designs": true,
        "social_media_kit": false,
        "vector_file": false
      },
      "deliveryTime": [
        {
          "days": 3,
          "additionalCost": 0
        },
        {
          "days": 1,
          "additionalCost": 21.90
        }
      ]
    },
    "faqs": [
      {
        "question": "What is included in the $20 Basic Package?",
        "answer": "Ordering the Basic $20 Basic Package you will receive: 1. 1 Designing Concept 2. 300 DPI Resolution File (JPG, PNG, PDF) 3. 5 Revisions 4. Logo Transparency"
      },
      {
        "question": "How can I order Social Kit?",
        "answer": "After choosing one of the Packages you will have the possibility to add other extras. We have listed Social Kit as an extra on this Gig."
      },
      {
        "question": "How can I order Social Kit and Stationery?",
        "answer": "After choosing one of the Packages you will have the possibility to add other extras. We have listed Stationery Design and Social Kit as an extra on this Gig."
      }
    ],
    "status": {
      "basicInfo": true,
      "imageUpload": true,
      "services": true,
      "deliveryTimes": true,
      "pricing": true,
      "published": true
    },
    "seller": {
      "sId": "uniqueId",
      "level": 2,
      "pro": true,
      "speaks": [
        "English",
        "Spanish"
      ],
      "location": {
        "lat": 46.07,
        "lon": 1.47
      },
      "country": "United Kingdom"
    },
    "packages": {
      "basic": {
        "description": "1 Professional Design Concept | 5 Revisions | High Resolution File | Logo Transparency",
        "cost": 25.87,
        "revisions": "3",
        "offeredServices": {
          "source_file": true,
          "logo_transparency": true
        }
      },
      "standard": {
        "description": "3 Professional Design Concepts | Unlimited Revisions | JPG and Logo Transparency | Source File |",
        "cost": 35.87,
        "revisions": "unlimited",
        "offeredServices": {
          "source_file": true,
          "logo_transparency": true,
          "high_resolution": true
        }
      },
      "premium": {
        "description": "4 Professional Design Concepts | Unlimited Revisions | Stationery | All Files",
        "cost": 75.87,
        "revisions": "unlimited",
        "offeredServices": {
          "source_file": true,
          "logo_transparency": true,
          "high_resolution": true,
          "3d_mockup": true,
          "stationery_designs": true
        }
      }
    }
  }

  static gitPartialUpdate = { "doc": { "enabled": true } }

  static profile = {
    "firstName": "First Name",
    "lastName": "lstName",
    "level": 1,
    "profileType": "SELLER",
    "pro": false,
    "speaks": [
       { "proficiency": "E", "language": "EN" }
    ],
    "location": {
      "lat": 46.07,
      "lon": 1.47
    },
    "country": "UK",
    "qualifications": [
        { "country": "IN", "college": "xyz", "title": "", "major": "", "year": "" }
    ],
      "skillSet": [
          { "proficiency": "E", "skill": "Cloud Eng" }
      ],
      "occupation": {
        "primary": { "category": "DM", "skills": ["DM_CM","DM_MM"] },
        "Secondary": { "category": "DM", "skills": ["DM_CM","DM_MM"] }
      },
      "certifications": [
          { "name": "", "Certified_from": "", "year": 2015 }
      ],
      "profilePic": "https://location/to/profilepic.jpg",
      "shortBio": "Short Bio",
      "website": "https://website.com"
  }

  static review = {
    "gigId": "g1",
    "sId": "s1",
    "cId": "uniqueId",
    "rating": 4.5,
    "review": "Same review about the gig delivery",
    "createdOn": "2020-10-05",
    "updatedOn": "2020-11-19",
    "displayImages": [
      "image_link_1",
      "image_link_2"
    ],
    "helpful": [
      "c2",
      "c3",
      "c4"
    ]
  }

  static defaultSearch = {
    "from": 0,
    "size": 5,
    "query": {
      "match_all": {}
    }
  }

  static defaultEvent = { body: {}, path: { id: "" }, cognitoPoolClaims: { sub: "uniqueId"} }
}
