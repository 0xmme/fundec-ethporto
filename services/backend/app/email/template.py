def create_html_email_verification(code: str):
    template = f"""
    <!DOCTYPE html>
    <html>
      <head>
        <body>
         <p>We received your request for a single-use login code to use with FundECO.</p>
         <p></p>
         <p>Your single-use login code is: {code}</p>
        </body>
      </head>
    </html>
    """

    return template
