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
              // If you have any troubles with this, please email me at 
              // mike@bootstraphero.com or call 330.329.8016 and I'll help you out.
              //
              // This javascript should go into the page where you would like the Style Editor
              // to be displayed. It needs to have jQuery and the styler.js referenced before launch
              //
              // The Styler.js include is at:
              // 
              //    https://bsh-assets-origin.s3.amazonaws.com/js/v1/styler.js
              //                        
              // api_key: To get your API key, sign up at 
              //
              //    http://www.bootstraphero.com/users/sign_up
              //               
              api_key: 'YOUR-API-KEY',

              // target_selector: a jQuery selector for where you would like the Style Editor
              // placed within your page.
              //
              //Examples:
              //    target_selector: '#style-container'
              //    target_selector: '.editor div'
              target_selector: '#YOUR-TARGET-JQUERY-SELECTOR',

              // design_lookup_key: Your identifier for the launched design, and typically the 
              // same identifier (or combination of identifiers) that you use in identifying 
              // your users, pages and apps.
              // 
              // If a new design_lookup_key is passed into the Style Editor a new Design is created.
              //
              // If an existing (you've passed it in before) design_lookup_key is passed into the
              // Style Editor the previously created design is launched for editing.
              //
              // Examples:
              //      design_lookup_key: '1'
              //      design_lookup_key: 'user-25-site-300'
              //      design_lookup_key: 'app-2030'        
              design_lookup_key: '#YOUR-DESIGN-LOOKUP-KEY',

              // Semantically tagged version of Bootstrap that you are using.
              // 
              // Examples:
              //        bootstrap_version: '2.1.0'
              //        bootstrap_version: '2.3.1'
              //
              // Currently 2.3.1 is the latest production version of Bootstrap
              bootstrap_version: '2.3.1',
              
              // api_version
              // for future compatibility. For now there is only 'v1'
              api_version: 'v1',

              // OPTIONAL ITEMS          
              // 
              // preview_url
              // A URL on your site that you would like to have shown in the viewport window of the style editor.
              //
              // Typically, this is the page that your users are customizing for themselves.
              //
              // If not specified, a default page showcasing how the chosen style elements (fonts, palettes and 
              // backgrounds) will look applied to various Bootstrap components.
              //
              // IMPORTANT: In order for the real-time display to work you'll need to include previewer.js on the 
              // preview_url specified page
              //
              // The Previewer.js include is at:
              // 
              //    https://bsh-assets-origin.s3.amazonaws.com/js/v1/previewer.js
              //
              // Examples:
              //      preview_url: 'http://mysite.com/app_site/show/343'

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

<link rel='stylesheet' src='https://bsh_sites_dev.s3.amazonaws.com/site/YOUR_API_KEY/DESIGN_TOKEN/design.css'>

```


