## Using Shangwa DB in the dom

Shangwa DB was made using the fs (file system) module. The fs module is a Node JS runtime module for handling files and this module is not available in the DOM. So you can't use this package in the dom directy so here is how you can go arround that 

## Using Next JS Api routes [Api Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

If you are using this package with NExt JS with the new server actions here is how you do it

``` ts
    export async function getUser(formData : FormData) {

        // Get id from form ID, if its undefined set the id
        // const to 'null'
        const id = formData.get('id') ?? 'null';

        if(id != 'null') {
            const userData = usersCol.getDicWithId(id);

            // Log the data to preview it!
            console.log(userData);

            // Code to return the responce to the user!
        } else {
            console.log('ID field was null')
        }

    }
```
