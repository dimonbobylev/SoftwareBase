import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3 as sq
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Soft, Order
import result


app = Flask(__name__)
CORS(app)

# Подключаемся и создаем сессию базы данных
engine = create_engine('sqlite:///soft-collection.db?check_same_thread=False')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route("/softCD/", methods=['GET'])
def soft_cd():
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM soft")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error as e:
        session.rollback()
        print("Ошибка открытия в БД")
    # print(list_bd)
    return jsonify(list_bd)


@app.route("/onAddSoft", methods=['POST'])
def add_soft():
    f = request.json
    print(f)
    date = f['date']
    a = datetime.date(int(date[0:4]), int(date[5:7]), int(date[8:10]))
    # new_soft = Soft(inv=f['inv'], date=a, article=f['article'], os=f['os'], title=f['title'])
    # for res in new_soft:
    #     print(res)
    # session.add(new_soft)
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
            cur.execute("SELECT * FROM soft")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error as e:
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
            cur.execute("SELECT * FROM soft")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error as e:
        session.rollback()
        print("Ошибка обновления БД")
    return jsonify(list_bd)


@app.route("/onDeleteSoft", methods=['POST'])
def delete_soft():
    f = request.json
    print(str(f['id']))
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            text_request = "DELETE FROM soft WHERE id = " + str(f['id']) + ""
            # print(text_request)
            cur.execute(text_request)
            session.commit()
            cur.execute("SELECT * FROM soft")
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error as e:
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
                         " AND " + "'" + str(f['dateFinish']) + "'"
            cur.execute(sql_update)
            res = cur.fetchall()
            list_bd = result.array_json(res)
    except sq.Error as e:
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
    except sq.Error as e:
        session.rollback()
        print("Ошибка удаления из БД")
    return jsonify(list_bd)


@app.route("/allOrder/", methods=['GET'])
def all_order():
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM orderKCh")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error as e:
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
        print(sql_update)
        cur.execute(sql_update)
        session.commit()
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM orderKCh")
            res = cur.fetchall()
            list_bd = result.array_order(res)
    except sq.Error as e:
        session.rollback()
        print("Ошибка добавления в БД")
    return jsonify(list_bd)


if __name__ == '__main__':
    app.run(debug=True)
