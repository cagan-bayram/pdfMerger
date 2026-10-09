import pypdf
import os

pdfs = [i for i in os.listdir() if i.endswith(".pdf")]

merger = pypdf.PdfWriter()

# Sort the files if needed
for filename in pdfs:
    merger.append(filename)

# Output file
merger.write("cagan-old-passport.pdf")
merger.close()