# -*- coding: UTF-8 -*-
# !/usr/bin/env python
from __future__ import unicode_literals
from odf.opendocument import OpenDocumentText
from odf.style import Style, TextProperties, ParagraphProperties, TableColumnProperties, TableCellProperties
from odf.text import P
from odf.table import Table, TableColumn, TableRow, TableCell


################################################################################
############# Classes #############
###################################

class Document_Generic(object):
    """Example of document"""

    def __init__(self):
        self.document = OpenDocumentText()
        self.defineStyles()

    def defineStyles(self):
        """  """
        pass

    def addParagraphStyle(self, id, name, paragraph_properties={}, text_properties={}):
        """  """
        style = Style(name=name, family="paragraph")
        if len(paragraph_properties) > 0:
            style.addElement(ParagraphProperties(**paragraph_properties))
        if len(text_properties) > 0:
            style.addElement(TextProperties(**text_properties))
        setattr(self, id, style)
        self.document.styles.addElement(style)

    def addTableColumnStyle(self, id, name, properties={}):
        """  """
        style = Style(name=name, family="table-column")
        style.addElement(TableColumnProperties(**properties))
        setattr(self, id, style)
        self.document.automaticstyles.addElement(style)

    def addParagraph(self, text, stylename):
        """  """
        stylename = getattr(self, stylename, None)
        p = P(stylename=stylename, text=text)
        self.document.text.addElement(p)

    def add_table(self, content, cell_style, column_styles=[]):
        cell_style = getattr(self, cell_style, None)
        table = Table()
        for style in column_styles:
            if "stylename" in style.keys():
                style["stylename"] = getattr(self, style["stylename"], None)
                table.addElement(TableColumn(**style))
        for row in content:
            tr = TableRow()
            table.addElement(tr)
            for cell in row:
                tc = TableCell()
                tr.addElement(tc)
                p = P(stylename=cell_style, text=cell)
                tc.addElement(p)
        self.document.text.addElement(table)

    def save(self, filename):
        """  """
        self.document.save(filename)


class Document_Template(Document_Generic):

    def defineStyles(self):

        self.addParagraphStyle("heading2", "Heading 2",
                               paragraph_properties={"breakbefore": "false",
                                                     "lineheight": "24pt",
                                                     "textalign": "center",
                                                     "marginbottom": "0.2in"},
                               text_properties={"fontfamily": "Verdana",
                                                "fontweight": "bold",
                                                "fontsize": "16pt",
                                                }
                               )


        self.addParagraphStyle("tablecontents", "Table Contents",
                               paragraph_properties={"numberlines": "true", "linenumber": "0"},
                               )

        self.addTableColumnStyle("column1", "Column1",
                                 properties={"columnwidth": "1cm"},
                                 )

        self.addTableColumnStyle("column2", "Column2",
                                 properties={"columnwidth": "3cm"}
                                 )
        self.addTableColumnStyle("column3", "Column3",
                                 properties={"columnwidth": "2cm"}
                                 )
        self.addTableColumnStyle("column4", "Column4",
                                 properties={"columnwidth": "6cm"}
                                 )