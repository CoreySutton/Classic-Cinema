#!/usr/bin/python

import xml.dom.minidom
import cgi

def addRating(xmlFile, username, rating):
    # Read the XML document from a file
    dom = xml.dom.minidom.parse(xmlFile)

    # Wrap username and rating in tags
    userElement = dom.createElement("user")
    userElement.appendChild(dom.createTextNode(username))
    ratingElement = dom.createElement("rating")
    ratingElement.appendChild(dom.createTextNode(rating))

    # Put these tags inside a <review> element
    newReview = dom.createElement("review")
    newReview.appendChild(userElement)
    newReview.appendChild(ratingElement)

    # Add this to the list of reviews
    reviews = dom.getElementsByTagName("reviews")[0]
    reviews.appendChild(newReview)

    # Write the result back to the XML file
    f = open(xmlFile, "w")
    f.write(dom.toxml())

print "Content-Type: text/html"
print
form = cgi.FieldStorage()
fname = form["username"].value
review = form["review"].value
xmlName = form["xmlUrl"].value

addRating(xmlName, fname, review)
