# Shangwa DB

Shangwa DB is a NO-SQL document data store that programmers can use during testing  and development. There are situations where you might want to test your app using a mock or fake database, Shangwa DB is there for you.

1. Its local so there is no need to make metwork calls which can be slow
2. It can be git ignored (optional) to reduce the bloat of your git repository
3. Easy to use api


# Database Heirachy

Database -> Clusters -> Documents

# API

## Creating a database
``` ts
// Initializing a database
const db = createDatabase({
    name : 'test-db',
});
```
The above code creates a directory where your database lives. The file is also automatically git ignored

``` ts
// Initializing a database
const db = createDatabase({
    name : 'test-db',
    shouldGitIgnore : false
});
```

If you want changes in your databases to be tracked by your viersioning system then set the `shouldGitIgnore` flag to false


The following directory is automatically created for you but you don't have to ever touch it! JUst know that thats where your database leaves
```

-- shangwadb
    |
    -- test_db
```

## Creating a Collection

``` ts

    // Creates a collection called users 
    const usersCol = db.createCollection({
        name : 'users'
    })
```

## Inserting a single document

### Method 1 : Using a class

``` ts

    // Define a class representing your json object 

    @JsonEntity
    class User {
        [x: string]: any;
        constructor(
            public id : string,
            public username : string,
            public password : string,
        )
    }

    // create an instance of your user class
    const newUser = new User('tadiwa', '12345678');

    // Insert the doc
    usersCol.insertOne(newUser.toDb())

```

### 2. Alternative

``` ts

    useersCol.insertOne({
        username : 'tadiwa',
        password : '12345678'
    })

```

