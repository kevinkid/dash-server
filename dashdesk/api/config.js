
module.exports = {
  "database": {
    "production": {
      "server": {
        "host": "https://dashdesk.azurewebsites.net",
        "port": "Default"
      },
      "host": "mongodb://dash2682:dash2682@ds056419.mlab.com:56419/dash",
      "username": "nothing",
      "password": "nothing"
    },
    "development": {
      "server": {
        "host": "http://localhost:666",
        "port": "6666"
      },
      "host": "mongodb://localhost:27017/dash",
      "username": "nothing",
      "password": "nothing"
    }
  },
  "accounts": {
    "outlook": {
      "credentials":  {
          "authority": "https://login.microsoftonline.com/common",
          "clientID": "d2d6267b-a005-4146-b79a-a754e5e0def3",
          "clientSecret": "wLPDOaGMOjWtGu9iUzsWsMcOLrXPwNG9uOdswFFQoj0=",
          "clientID_old" : "732617fd-15b7-4f14-9c8d-218e2cedfc45",
          "clientSecret_old": "dDkoENVi+oT3//Hh1Y79AO2rjIfSXkBljkswdKM3Vkg=",
          "redirectUri": "https://dashdesk.azurewebsites.net/callback"
      },
      "subscriptionConfiguration": {
          "ChaneType": "Created, Updated",
          "notificationUrl": "https://dashdesk.azurewebsites.net/listen",
          "notificationUrl_old": "https://dashdesk.azurewebsites.net/listen",
          "resource": "me/mailfolders(\\'Inbox\\')/messages',",
          "clientState": "cLIENTsTATEfORvALIDATION"
      }
    }
  },
  "gmail":{
    "credentials": {

    },
    "subscriptionConfiguration" :{

    }
  },
  "skype" : {
    "credentials": {

    },
    "subscriptionConfiguration" :{

    }
  }, 
  "yahoo": {
    "credentials": {

    },
    "subscriptionConfiguration" :{

    }
  },
  "evernote": {
    "credentials": {

    },
    "subscriptionConfiguration" :{

    }
  },
  "yammah": {
    "credentials": {

    },
    "subscriptionConfiguration" :{

    }
  }
   
};
