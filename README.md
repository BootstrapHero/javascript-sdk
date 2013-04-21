Bootstrap Hero Javascript SDK
=========
This repository is a collection of scripts, examples and documentation to help you integrate your site with the Bootstrap Hero service. Typically, this is used by web applications that would let their users customize or brand their own pages within a larger site.

#### Example Uses Might Include:
  - Bands customizing their own page on a concert site
  - Startups setting a color scheme that matches their logo 
  - A Theme Provider letting individual users personalize a theme

#### What We Replace

Our main user interface element is the embeddable Style Editor (screenshot below) which conceptually replaces the "type CSS into this big empty textarea" that is found on many sites' customization pages.

We want to make it easy for your users to create a great looking page so that they love your service even more.

    * Palettes with colors that already work together
    * Curated and appropriate font choices for headers and body type (we'll guide your users away from Comic Lobster)
    * Translucent background images
    * Realtime Previews of all design choices with your current contact 

#### Bootstrap Hero Style Editor



![Style Editor](https://raw.github.com/BootstrapHero/javascript-sdk/master/demo/images/screenshot.jpg)



### User Style Customization Workflow

After you've set everything up, this is the process your users would see.

1. From within your site, users would Launch the Style Editor by clicking a link or button.

    * Users never leave your site
    * Users never see anything but your branding
    * Styling process can be embedded in other workflows (signup, template customization)
   
2. Users choose palettes, backgrounds and fonts from the Icon and Form bars, while viewing the results of their work in the Preview Frame.

3. Once they are happy with their new style, users hit a "Publish" button (that you've specified) and the styles are permanently set on their pages.


## GETTING STARTED

#### Prerequisites
You'll need a few things:

* An API Key
* A page on your site where you'd like the style editor embedded, the 'Style Page'
* A page (or pages) with the previewer.js file included, this page is what you specify with the preview_url option.

#### Usage

1 - Add Styler.js to a page


```html
    <script src="https://bsh-assets-origin.s3.amazonaws.com/js/v1/styler.js"></script>
```

Then, within your ready block, call the editor after customizing the inputs. 

```javascript
    $(function() {
          BSHStyler.launch({
                  // REQUIRED
                  api_key: 'YOUR-API-KEY',
                  target_selector: '#YOUR-TARGET-SELECTOR',
                  client_lookup_key: 'YOUR-CLIENT-LOOKUP-ID',
                  bootstrap_version: '2.3.1',
                  api_version: 'v1',

                  // OPTIONAL
                  preview_url: 'https://example.com/users/40/profile_page'

           });
    });
```

2 - After your user edits the style - call **BSHStyler.publish(myBSHResponseHandler)**

```html
      <button onclick='BSHEditor.publish(myBSHResponseHandler);'>Publish</button>
```

3 - In your myBSHResponseHandler() 

* Retrieve the token representing this particular iteration of this user's design.
* Save the token to your system 
* Redirect the user to their custom styled page

```javascript

     function myBSHResponseHandler(){          
          var designToken = BSHEditor.token();

          // You need to implement
          // An AJAX Call to save the design token in your system that redirects on success
          // $.post('yoursite.com/update/', {'design_token': designToken})
          //   .done(function(data) {
          //            window.location.href = "http://yoursite.com/user-branded-page/";
          // });
          //         
      }
```

4 - On the users custom styled page, use the token to reference their design

```html

<link rel='stylesheet' src='//cdn-design-assets.bootstraphero.com/TOKEN/design.css'>

```



### STYLER.JS CONFIGURATION OPTIONS
On the Style Page, first include the styler.js file after your jQuery include.

### Required

#### target_selector
The location within your Style Page where you'd like the Style Editing window to be placed. Typically this is a large div on your Style Page. 

```javascript
    //Examples:
        target_selector: '#style-container'
        target_selector: '.editor div'
```

#### client_lookup_key
Your identifier for the launched design, and typically the same identifier you use in identifying your users.

If a new client_lookup_key is passed into the Style Editor a new Design is created. 

If an existing (you've passed it in before) client_lookup_id is passed into the Style Editor the previously created design is launched for editing.

```javascript
    //Examples:
        client_lookup_key: '1'
        client_lookup_key: 'user-25-site-300'
        client_lookup_key: 'app-2030'
```

#### bootstrap_version
Semantically tagged version of Bootstrap that you are using. 

```javascript
    //Examples:
        bootstrap_version: '2.1.0'
        bootstrap_version: '2.1.3'
```

#### api_key 
Your API Key from the Bootstrap Hero site.

#### api_version
Version of the Bootstrap Hero API you'd like to interact with.

### Optional

#### preview_url

> Important: After setting the preview_url you'll still need to include previewer.js on the preview_url page 

```html
    <script src="https://bsh-assets-origin.s3.amazonaws.com/js/v1/previewer.js"></script>
```

A URL on your site that you would like to have shown in the viewport window of the style editor.

Typically, this is the page that your users are customizing for themselves. 

If not specified, a default page showcasing how the chosen style elements (fonts, palettes and backgrounds) will look applied to various Bootstrap components. 



