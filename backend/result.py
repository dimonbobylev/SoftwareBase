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


def array_order(result):
    list_bd = []
    for res in result:
        data_order = {}
        data_order['id'] = res[0]
        data_order['inv'] = res[1]
        data_order['ord'] = res[2]
        data_order['date'] = res[3]
        data_order['count'] = res[4]
        data_order['time'] = res[5]
        data_order['act'] = res[6]
        data_order['title'] = res[7]
        list_bd.append(data_order)
    return list_bd
