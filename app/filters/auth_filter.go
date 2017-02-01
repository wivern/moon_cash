package filters

import "github.com/revel/revel"

var AuthFiler = func(c *revel.Controller, fc []revel.Filter){
	requestUrl := c.Request.URL.Path
	user := c.Session["user"]
	if (user == "" && stringInSlice(requestUrl, []string{"/api/accounts"})){
		c.Session["requested"] = requestUrl
		c.Result = c.Redirect("/signin")
		return
	}
	fc[0](c, fc[1:])
}

func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}
