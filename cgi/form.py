#!/usr/bin/python

import cgi

form = cgi.FieldStorage()
firstname = form["firstname"].value
lastname = form["lastname"].value

print "Content-type: text/html"
print
print "<p>Hello " + firstname + " " + lastname + "!</p>"
