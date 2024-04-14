




export function KrSamples(record_type, record_id=1){

    switch(record_type){

        case 'Person': return person(record_id);
        case 'Organization': return organization(record_id);
        case 'Product': return product(record_id);
        case 'ItemList': return itemlist(record_id);
        case 'ListItem': return listitem(record_id);
        default: return thing(record_id);
    }

    
}



function thing(record_id){

    let record = {
        "@type": "Thing",
        "@id": "thing_" + String(record_id),
        "name": "Test thing_" + String(record_id),
        "url": "https://www.test.com/"
    };
    return record;

}



function itemlist(record_id){

    let record = {
        "@type": "ItemList",
        "@id": "ItemList_" + String(record_id),
        "name": "Test ItemList " + String(record_id),
        "url": "https://www.test.com/",
        "itemListElement": [
            listitem(0),
            listitem(1),
            listitem(2),
            listitem(3),
            listitem(4),
            listitem(5),
            listitem(6),
            listitem(7),
            listitem(8),
            listitem(9),
        ]                          
    };
    return record;

}

function listitem(record_id){

    let record = {
        "@type": "ListItem",
        "@id": "ListItem_" + String(record_id),
        "name": "Test ListItem " + String(record_id),
        "position": record_id,
        "item": thing(record_id),
        "previousItem": null,
        "nextItem": null
    };
    return record;
}


function person(record_id){

    let record = {
        "@type": "Person",
        "@id": "person_" + String(record_id),
        "givenName": "givenName_"+  String(record_id),
        "familyName": "familyName_"+ String(record_id),
        "email": "test@test.com",
        "telephone": "1-514-111-2222",
        "hasOccupation": {
            "@type": "Occupation",
            "name": "occupation_"+ String(record_id)
            },
        "worksfor": {
            "@type": "organization",
            "name": "test_org_" + String(record_id),
            "url": "https://www.test.com"
            }
    };
    return record;
    
}


function organization(record_id){


    let record = {
        "@context": "https://schema.org/",
        "@type": "organization",
        "@id": "abc123",
        "name": "Test org 1",
        "url": "https://www.test.com/"
    };
    return record;
    
}

function postalAddress(record_id){

    let record = {      
            "@type": "PostalAddress",      
            "streetAddress": "7 S. Broadway",
            "addressLocality": "Denver",      
            "addressRegion": "CO",      
            "postalCode": "80209",      
            "addressCountry": "US"
         };
    return record;
}


function product(record_id){

    let record = {
      "@context": "https://schema.org",
      "@type": "Product",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "3.5",
        "reviewCount": "11"
      },
      "description": "0.7 cubic feet countertop microwave. Has six preset cooking categories and convenience features like Add-A-Minute and Child Lock.",
      "name": "Kenmore White 17\" Microwave",
      "image": "kenmore-microwave-17in.jpg",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "55.00",
            "priceCurrency": "USD"
          },
          "review": [
            {
              "@type": "Review",
              "author": "Ellie",
              "datePublished": "2011-04-01",
              "reviewBody": "The lamp burned out and now I have to replace it.",
              "name": "Not a happy camper",
              "reviewRating": {
                "@type": "Rating",
                "bestRating": "5",
                "ratingValue": "1",
                "worstRating": "1"
              }
            },
            {
              "@type": "Review",
              "author": "Lucas",
              "datePublished": "2011-03-25",
              "reviewBody": "Great microwave for the price. It is small and fits in my apartment.",
              "name": "Value purchase",
              "reviewRating": {
                "@type": "Rating",
                "bestRating": "5",
                "ratingValue": "4",
                "worstRating": "1"
              }
            }
          ]
    };
    return record;
}



function invoice(record_id){


    let record = {
            "@context": "https://schema.org/",
            "@type": "Invoice",
            "broker": {
              "@type": "LocalBusiness",
              "name": "ACME Home Heating"
            },
            "accountId": "xxxx-xxxx-xxxx-1234",
            "customer": {
              "@type": "Person",
              "name": "Jane Doe"
            },
            "paymentDueDate": "2015-01-30",
            "minimumPaymentDue": {
              "@type": "PriceSpecification",
              "price": 0.00,
              "priceCurrency": "USD"
            },
            "totalPaymentDue": {
              "@type": "PriceSpecification",
              "price": 0.00,
              "priceCurrency": "USD"
            },
            "paymentStatus": "https://schema.org/PaymentComplete",
            "referencesOrder": [
              {
                "@type": "Order",
                "description": "furnace",
                "orderDate": "2014-12-01",
                "orderNumber": "123ABC",
                "paymentMethod": "http://purl.org/goodrelations/v1#ByInvoice",
                "orderedItem": {
                  "@type": "Product",
                  "name": "ACME Furnace 3000",
                  "productID": "ABC123"
                }
              },
              {
                "@type": "Order",
                "description": "furnace installation",
                "orderDate": "2014-12-02",
                "paymentMethod": "http://purl.org/goodrelations/v1#ByInvoice",
                "orderedItem": {
                  "@type": "Service",
                  "description": "furnace installation"
                }
              }
            ]
        };
    return record;
}

function action(record_id){


    let record = {
          "@context": "https://schema.org",
          "@type": "Action",
          "agent": {
            "@type": "Person",
            "name": "John"
          },
          "object": {
            "@type": "MusicGroup",
            "name": "Pink!"
          },
          "participant": {
            "@type": "Person",
            "name": "Steve"
          },
          "location": {
            "@type": "Residence",
            "name": "Ann's apartment"
          },
          "instrument": {
            "@type": "Product",
            "name": "iPod"
          },
        "actionStatus": "completedActionStatus"
        };

    return action;

}