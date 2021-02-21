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

def state_data(data, senators, census):
    state_index = 5    
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
            state_stats[state]["city"][city] = {"superfund_count": 1, "black_pop_g13": False}
        else:
            state_stats[state]["city"][city]["superfund_count"] += 1
    
    for i in range(len(senators)):
        senator = senators[i][15] 
        state = senators[i][0]
        contact = senators[i][46]

        if state not in state_stats.keys():
            state_stats[state] = dict()

        if "senators" not in state_stats[state].keys():
            state_stats[state]["senators"] = dict()
            state_stats[state]["senators"]["senator_name_1"] = senator
            state_stats[state]["senators"]["contact_site_1"] = contact
        else:
            state_stats[state]["senators"]["senator_name_2"] = senator
            state_stats[state]["senators"]["contact_site_2"] = contact
            
    for i in range(len(census)):
        state = census[i][0]
        city  = census[i][1]

        if state in state_stats.keys():
            if city in state_stats[state]["city"].keys():
                '''
                if "sf_black_g13" not in state_stats[state].keys():
                    state_stats[state]["sf_black_g13"] = 1
                else:
                    print(city, state)
                    state_stats[state]["sf_black_g13"] += 1
                '''
                state_stats[state]["city"][city]["black_pop_g13"] = True

    for state in state_stats:
        count = 0
        for city in state_stats[state]["city"]:
            if city["black_pop_g13"] == True:
                count += city["superfund_count"]

        state["sf_black_g13"] = count

    print(state_stats["Delaware"])

    save_to_json(state_stats, "state_data")

def main():
    data = get_data("./superfund.csv")
    senators = get_data("./us-senate.csv")

    census = get_data("./SuperFund_And_BlackCensus.csv")

    state_data(data, senators, census)
    


if __name__ == "__main__":
    main()
