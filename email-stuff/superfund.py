import csv 
import json

def get_data(filename):
    """
    Get occurrence_data from csv <filename> as a nested list, one list for each line.
    :param filename: (str) file path to open
    :return: (list) file contents as nested list
    """
    with open(filename, newline='', encoding='utf-8') as csvfile:
        infile = csv.reader(csvfile, escapechar="\\")
        next(infile)
        data = list(infile)

    return data

def save_to_json(d, name):
    with open(f'{name}.json', 'w') as outfile:
        json.dump(d, outfile, ensure_ascii=False)

def state_data(data, senators):
    state_index = 5    

    senator_state_index = 0
    senator_name_index = 15
    senator_contact_index = 46
    city_index = 6

    state_stats = dict()

    for i in range(len(data)):
        state = data[i][state_index] 
        city = data[i][city_index].replace(" County", "").strip(" ")
        if state not in state_stats.keys():
            state_stats[state] = {"superfund_sites": 1, "city": dict()}
        else:
            state_stats[state]["superfund_sites"] += 1

        if city not in state_stats[state]["city"].keys():
            state_stats[state]["city"][city] = 1
        else:
            state_stats[state]["city"][city] += 1

    for i in range(len(senators)):
        senator = senators[i][senator_name_index] 
        state = senators[i][senator_state_index]
        contact = senators[i][senator_contact_index]

        if state not in state_stats.keys():
            state_stats[state] = dict()

        if "senators" not in state_stats[state].keys():
            state_stats[state]["senators"] = dict()
            state_stats[state]["senators"]["senator_name_1"] = senator
            state_stats[state]["senators"]["contact_site_1"] = contact
        else:
            state_stats[state]["senators"]["senator_name_2"] = senator
            state_stats[state]["senators"]["contact_site_2"] = contact
    
    print(state_stats["Georgia"])

    save_to_json(state_stats, "state_data")

def main():
    data = get_data("./superfund.csv")
    senators = get_data("./us-senate.csv")

    state_data(data, senators)
    


if __name__ == "__main__":
    main()
