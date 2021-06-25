def array_json(result):
    list_bd = []
    for res in result:
        row_data = {}
        row_data['id'] = res[0]
        row_data['inv'] = res[1]
        row_data['date'] = res[2]
        row_data['article'] = res[3]
        row_data['os'] = res[4]
        row_data['title'] = res[5]
        list_bd.append(row_data)

    return list_bd