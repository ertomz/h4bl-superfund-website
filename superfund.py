import csv 
def get_data(filename):
    """
    Get occurrence_data from csv <filename> as a nested list, one list for each line.
    :param filename: (str) file path to open
    :return: (list) file contents as nested list
    """
    with open(filename, newline='', encoding='utf-8') as csvfile:
        infile = csv.reader(csvfile, escapechar="\\")
        next(infile)
        return (list(infile))

def main():
    data = get_data("superfund.csv")
    senators = get_data("us-senate.csv")
    name_index = 0
    state_index = 5
    city_index = 6
    county_index = 7

    senator_state_index = 0
    senator_name_index = 15
    senator_contact_index = 46

    state_stats = dict()

    for i in range(len(data)):
        state = data[i][state_index] 
        if state not in state_stats.keys():
            state_stats[state] = {"superfund_sites": 1}
        else:
            state_stats[state]["superfund_sites"] += 1

    for i in range(len(senators)):
        senator = senators[i][senator_name_index] 
        state = senators[i][senator_state_index]
        contact = senators[i][senator_contact_index]

        if state not in state_stats.keys():
            state_stats[state] = dict()

        if "senator_name_1" not in state_stats[state].keys():
            state_stats[state]["senator_name_1"] = senator
            state_stats[state]["contact_site_1"] = contact
        else:
            state_stats[state]["senator_name_2"] = senator
            state_stats[state]["contact_site_2"] = contact
    
    print(state_stats["New Mexico"])


if __name__ == "__main__":
    main()
