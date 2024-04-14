



function extract_domain(value){

    var httpRegex = /^(http://|https://|http://www\.|https://www\.|www\.)?(www\.(twanda))?(([\w\-]+)?\.?(twanda|))(\.ch|\.com)(:\d+)?/.+$/;
    // Validate URL
    return httpRegex.test(this._value); // Returns true

    
    ^(http://|https://|http://www\.|https://www\.|www\.)?(www\.(twanda))?(([\w\-]+)?\.?(twanda|))(\.ch|\.com)(:\d+)?/.+$

}