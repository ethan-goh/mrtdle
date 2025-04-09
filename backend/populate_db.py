from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import Line, Station, station_lines
from sqlalchemy import text


MRT_DATA = {
    "North-South Line": [
        ("Jurong East", True, "West"), ("Bukit Batok", False, "West"), ("Bukit Gombak", False, "West"),
        ("Choa Chu Kang", False, "North"), ("Yew Tee", False, "North"), ("Kranji", False, "North"),
        ("Marsiling", False, "North"), ("Woodlands", True, "North"), ("Admiralty", False, "North"),
        ("Sembawang", False, "North"), ("Canberra", False, "North"), ("Yishun", False, "North"),
        ("Khatib", False, "North"), ("Yio Chu Kang", False, "North"), ("Ang Mo Kio", False, "North"),
        ("Bishan", True, "Central"), ("Braddell", False, "Central"), ("Toa Payoh", False, "Central"),
        ("Novena", False, "Central"), ("Newton", True, "Central"), ("Orchard", False, "Central"),
        ("Somerset", False, "Central"), ("Dhoby Ghaut", True, "Central"), ("City Hall", True, "Central"),
        ("Raffles Place", True, "Central"), ("Marina Bay", True, "South"), ("Marina South Pier", False, "South")
    ],
    "East-West Line": [
        ("Pasir Ris", False, "East"), ("Tampines", True, "East"), ("Simei", False, "East"),
        ("Tanah Merah", False, "East"), ("Bedok", False, "East"), ("Kembangan", False, "East"),
        ("Eunos", False, "East"), ("Paya Lebar", True, "East"), ("Aljunied", False, "East"),
        ("Kallang", False, "Central"), ("Lavender", False, "Central"), ("Bugis", True, "Central"),
        ("City Hall", True, "Central"), ("Raffles Place", True, "Central"), ("Tanjong Pagar", False, "South"),
        ("Outram Park", True, "South"), ("Tiong Bahru", False, "Central"), ("Redhill", False, "Central"),
        ("Queenstown", False, "West"), ("Commonwealth", False, "West"), ("Buona Vista", True, "West"),
        ("Dover", False, "West"), ("Clementi", False, "West"), ("Jurong East", True, "West"),
        ("Chinese Garden", False, "West"), ("Lakeside", False, "West"), ("Boon Lay", False, "West"),
        ("Pioneer", False, "West"), ("Joo Koon", False, "West"), ("Gul Circle", False, "West"),
        ("Tuas Crescent", False, "West"), ("Tuas West Road", False, "West"), ("Tuas Link", False, "West"), 
        ("Expo", True, "East"), ("Changi Airport", False, "East")
    ],
    "North-East Line": [
        ("HarbourFront", True, "South"), ("Outram Park", True, "South"), ("Chinatown", True, "Central"),
        ("Clarke Quay", False, "Central"), ("Dhoby Ghaut", True, "Central"), ("Little India", True, "Central"),
        ("Farrer Park", False, "Central"), ("Boon Keng", False, "Central"), ("Potong Pasir", False, "Central"),
        ("Woodleigh", False, "Central"), ("Serangoon", True, "Central"), ("Kovan", False, "Central"),
        ("Hougang", False, "Central"), ("Buangkok", False, "North"), ("Sengkang", False, "North"),
        ("Punggol", False, "North")
    ],
    "Circle Line": [
        ("Dhoby Ghaut", True, "Central"), ("Bras Basah", False, "Central"), ("Esplanade", False, "Central"),
        ("Promenade", True, "Central"), ("Nicoll Highway", False, "Central"), ("Stadium", False, "Central"),
        ("Mountbatten", False, "Central"), ("Dakota", False, "Central"), ("Paya Lebar", True, "East"),
        ("MacPherson", True, "East"), ("Tai Seng", False, "East"), ("Bartley", False, "Central"),
        ("Serangoon", True, "Central"), ("Lorong Chuan", False, "Central"), ("Bishan", True, "Central"),
        ("Marymount", False, "Central"), ("Caldecott", True, "Central"), ("Botanic Gardens", True, "Central"),
        ("Farrer Road", False, "Central"), ("Holland Village", False, "Central"), ("Buona Vista", True, "West"),
        ("one-north", False, "West"), ("Kent Ridge", False, "West"), ("Haw Par Villa", False, "West"),
        ("Pasir Panjang", False, "West"), ("Labrador Park", False, "West"), ("Telok Blangah", False, "South"),
        ("HarbourFront", True, "South"), ("Marina Bay", True, "South"), ("Bayfront", True, "South")
    ],
    "Downtown Line": [("Bukit Panjang", False, "West"), ("Cashew", False, "West"), ("Hillview", False, "West"),
        ("Beauty World", False, "West"), ("King Albert Park", False, "West"), ("Sixth Avenue", False, "Central"),
        ("Tan Kah Kee", False, "Central"), ("Botanic Gardens", True, "Central"), ("Stevens", True, "Central"),
        ("Newton", True, "Central"), ("Little India", True, "Central"), ("Rochor", False, "Central"),
        ("Bugis", True, "Central"), ("Promenade", True, "Central"), ("Bayfront", True, "South"), 
        ("Downtown", False, "Central"), ("Telok Ayer", False, "Central"),
        ("Chinatown", True, "Central"), ("Fort Canning", False, "Central"), ("Bencoolen", False, "Central"),
        ("Jalan Besar", False, "Central"), ("Bendemeer", False, "Central"), ("Geylang Bahru", False, "Central"),
        ("Mattar", False, "East"), ("MacPherson", True, "East"), ("Ubi", False, "East"), ("Kaki Bukit", False, "East"),
        ("Bedok North", False, "East"), ("Bedok Reservoir", False, "East"), ("Tampines West", False, "East"),
        ("Tampines", True, "East"), ("Tampines East", False, "East"), ("Upper Changi", False, "East"),
        ("Expo", True, "East")
    ],
    "Thomson-East Coast Line": [
        ("Woodlands North", False, "North"), ("Woodlands", True, "North"), ("Woodlands South", False, "North"),
        ("Springleaf", False, "North"), ("Lentor", False, "North"), ("Mayflower", False, "North"),
        ("Bright Hill", False, "North"), ("Upper Thomson", False, "Central"), ("Caldecott", True, "Central"), 
        ("Stevens", True, "Central"), ("Napier", False, "Central"), ("Orchard Boulevard", False, "Central"),
        ("Orchard", True, "Central"), ("Great World", False, "Central"), ("Havelock", False, "Central"),
        ("Outram Park", True, "South"), ("Maxwell", False, "Central"), ("Shenton Way", False, "South"),
        ("Marina Bay", True, "South"), ("Gardens by the Bay", False, "South"), ("Tanjong Rhu", False, "East"),
        ("Katong Park", False, "East"), ("Tanjong Katong", False, "East"), ("Marine Parade", False, "East"),
        ("Marine Terrace", False, "East"), ("Siglap", False, "East"), ("Bayshore", False, "East")
    ]
}

def populate_db():
    db: Session = SessionLocal()
    db.execute(station_lines.delete())
    db.query(Station).delete()
    db.query(Line).delete()
    db.execute(text("ALTER SEQUENCE stations_id_seq RESTART WITH 1;"))
    db.execute(text("ALTER SEQUENCE lines_id_seq RESTART WITH 1;"))
    db.execute(text("ALTER SEQUENCE daily_station_id_seq RESTART WITH 1;"))
    db.commit()
    line_objects = {}
    for line_name in MRT_DATA.keys():
        line_obj = db.query(Line).filter_by(name=line_name).first()
        if not line_obj:
            line_obj = Line(name=line_name)
            db.add(line_obj)
        line_objects[line_name] = line_obj
    
    db.commit()

    for line_name, stations in MRT_DATA.items():
        line_obj = line_objects[line_name]
        for station_name, is_interchange, region in stations:
            station_obj = db.query(Station).filter_by(name=station_name).first()
            if not station_obj:
                station_obj = Station(name=station_name, is_interchange=is_interchange, region=region)
                db.add(station_obj)
            
            if line_obj not in station_obj.lines:
                station_obj.lines.append(line_obj)

        db.commit()