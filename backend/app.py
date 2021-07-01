from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3 as sq
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base
import os
import result
import table


app = Flask(__name__)
CORS(app)

# Подключаемся и создаем сессию базы данных
engine = create_engine('sqlite:///soft-collection.db?check_same_thread=False')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route("/softCD", methods=['GET'])
def soft_cd():
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM soft ORDER BY date")
            res = cur.fetchall()
            # for rs in res:
            #     print(rs)
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка открытия в БД")
    # print(list_bd)
    return jsonify(list_bd)


@app.route("/onAddSoft", methods=['POST'])
def add_soft():
    f = request.json
    with sq.connect("soft-collection.db") as con:
        cur = con.cursor()
        sql_update = "INSERT INTO soft (inv, date, article, os, title) VALUES(" + "'" + str(f['inv']) + "'," + \
                     "'" + str(f['date']) + "'," + "'" + str(f['article']) + "'," + "'" + str(f['os']) + "'," + \
                     "'" + str(f['title']) + "')"
        # print(sql_update)
        cur.execute(sql_update)
        session.commit()
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM soft ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка добавления в БД")
    return jsonify(list_bd)


@app.route("/onUpdateSoft", methods=['POST'])
def update_soft():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "UPDATE soft SET inv = " + "'" + str(f['inv']) + "'," + \
                         " date = " + "'" + str(f['date']) + "'," + " article = " + "'" + str(f['article']) + "'," + \
                         " os = " + "'" + str(f['os']) + "'," + " title = " + "'" + str(f['title']) + "'" + \
                         " where id = " + str(f['id'])
            # print(sql_update)
            cur.execute(sql_update)
            session.commit()
            cur.execute("SELECT * FROM soft ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка обновления БД")
    return jsonify(list_bd)


@app.route("/onDeleteSoft", methods=['POST'])
def delete_soft():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            text_request = "DELETE FROM soft WHERE id = " + str(f['id']) + ""
            cur.execute(text_request)
            session.commit()
            cur.execute("SELECT * FROM soft ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка удаления из БД")
    return jsonify(list_bd)


@app.route("/onDateFilter", methods=['POST'])
def date_filter():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "SELECT * FROM soft WHERE date BETWEEN " + "'" + str(f['dateStart']) + "'" + \
                         " AND " + "'" + str(f['dateFinish']) + "' ORDER BY date"
            # print(sql_update)
            cur.execute(sql_update)
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка фильтрации БД")
    return jsonify(list_bd)


@app.route("/onArticleStat", methods=['POST'])
def article_stat():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            text_request = "SELECT * FROM soft WHERE article = " + "'" + str(f['article']) + "'"
            cur.execute(text_request)
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error:
        session.rollback()
        print("Ошибка удаления из БД")
    return jsonify(list_bd)


@app.route("/invClick", methods=['POST'])
def inv_click():
    f = request.json
    # print(str(f['inv']))
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "SELECT * FROM orderKCh WHERE inv = '" + str(f['inv']) + "' ORDER BY date"
            # print(sql_update)
            cur.execute(sql_update)
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка открытия в БД")
    return jsonify(list_bd)


@app.route("/allOrder/", methods=['GET'])
def all_order():
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM orderKCh ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка открытия в БД")
    return jsonify(list_bd)


@app.route("/onAddOrder", methods=['POST'])
def add_order():
    f = request.json
    with sq.connect("soft-collection.db") as con:
        cur = con.cursor()
        sql_update = "INSERT INTO orderKCh (inv, ord, date, count, time, act, title) VALUES(" + \
                     "'" + str(f['inv']) + "'," + "'" + str(f['ord']) + "'," + "'" + str(f['date']) + "'," + \
                     f['count'] + "," + f['time'] + "," + "'" + str(f['act']) + "'," + \
                     "'" + str(f['title']) + "')"
        # print(sql_update)
        cur.execute(sql_update)
        session.commit()
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM orderKCh ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка добавления в БД")
    return jsonify(list_bd)


@app.route("/onDeleteOrder", methods=['POST'])
def delete_order():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            text_request = "DELETE FROM orderKCh WHERE id = " + str(f['id']) + ""
            cur.execute(text_request)
            session.commit()
            cur.execute("SELECT * FROM orderKCh ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка удаления из БД")
    return jsonify(list_bd)


@app.route("/onDateFilterOrder", methods=['POST'])
def date_filter_order():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "SELECT * FROM orderKCh WHERE date BETWEEN " + "'" + str(f['dateStart']) + "'" + \
                         " AND " + "'" + str(f['dateFinish']) + "' ORDER BY date"
            cur.execute(sql_update)
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка фильтрации БД")
    return jsonify(list_bd)


@app.route("/onUpdateOrder", methods=['POST'])
def update_order():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "UPDATE orderKCh SET inv = '" + str(f['inv']) + "', ord = '" + str(f['ord']) + \
                         "', date = '" + str(f['date']) + "', count = " + str(f['count']) + "," + \
                         " time = " + str(f['time']) + ", act = '" + str(f['act']) + "', title = '" + \
                         str(f['title']) + "' where id = " + str(f['id'])
            # print(sql_update)
            cur.execute(sql_update)
            session.commit()
            cur.execute("SELECT * FROM orderKCh ORDER BY date")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error:
        session.rollback()
        print("Ошибка обновления БД")
    return jsonify(list_bd)


@app.route("/onCreateFile", methods=['POST'])
def create_file_soft():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "SELECT * FROM soft WHERE date BETWEEN " + "'" + str(f['dateStart']) + "'" + \
                         " AND " + "'" + str(f['dateFinish']) + "' ORDER BY date"
            # print(sql_update)
            cur.execute(sql_update)
            res = cur.fetchall()
            doc_new = table.Document_Template()
            doc_new.addParagraph("Поставки СПО", "heading2")
            new_array = []
            ii = 0
            for rs in res:
                ii = ii + 1
                (a, b, c, d, i, f) = rs
                # print(str(d)[0:10])
                new_rs = (ii, b, str(c)[0:10], d, i)
                new_array.append(new_rs)
            doc_new.add_table(new_array, "tablecontents",
                              [
                                  {"numbercolumnsrepeated": 1, "stylename": "column1"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column2"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column2"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column2"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column2"},
                              ]
                              )
            doc_new.save("tab_soft.odt")
            os.system('libreoffice --view tab_soft.odt')
    except sq.Error:
        session.rollback()
        print("Ошибка фильтрации БД")
    return jsonify('Файл создан')


@app.route("/onCreateFileOrder", methods=['POST'])
def create_file_order():
    f = request.json
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            sql_update = "SELECT * FROM orderKCh WHERE date BETWEEN " + "'" + str(f['dateStart']) + "'" + \
                         " AND " + "'" + str(f['dateFinish']) + "' ORDER BY date"
            # print(sql_update)
            cur.execute(sql_update)
            res = cur.fetchall()
            doc_new = table.Document_Template()
            doc_new.addParagraph("Приказы КЧ", "heading2")
            new_array = []
            ii = 0
            for rs in res:
                ii = ii + 1
                (a, b, c, d, i, f, g, k) = rs
                # print(str(d)[0:10])
                new_rs = (ii, b, c, str(d)[0:10], g)
                new_array.append(new_rs)
            # print(new_array)
            doc_new.add_table(new_array, "tablecontents",
                              [
                                  {"numbercolumnsrepeated": 1, "stylename": "column1"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column3"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column3"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column3"},
                                  {"numbercolumnsrepeated": 1, "stylename": "column4"},
                              ]
                              )
            doc_new.save("tab_order.odt")
            os.system('libreoffice --view tab_order.odt')
    except sq.Error:
        session.rollback()
        print("Ошибка фильтрации БД")
    return jsonify('Файл создан')


if __name__ == '__main__':
    app.run(debug=True)
