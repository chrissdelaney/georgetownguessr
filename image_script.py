from PIL import Image
from pillow_heif import register_heif_opener

# This registers the HEIF opener with Pillow, allowing HEIF images to be opened.
register_heif_opener()

def get_exif_data(image_path):
    """Extract EXIF data from an image file."""
    image = Image.open(image_path)
    exif_data = {}
    
    # Ensure the image has EXIF data
    exif_info = image.getexif()  # Use the correct method getexif() here
    if exif_info:
        for tag, value in exif_info.items():
            decoded = Image.ExifTags.TAGS.get(tag, tag)
            if decoded == "GPSInfo":
                gps_data = {}
                # Ensure that the value is a dictionary before iterating
                if isinstance(value, dict):
                    for t in value:
                        sub_decoded = Image.ExifTags.GPSTAGS.get(t, t)
                        gps_data[sub_decoded] = value[t]
                    exif_data[decoded] = gps_data
                else:
                    exif_data[decoded] = value  # Directly assign non-dict values
            else:
                exif_data[decoded] = value
    return exif_data

def get_lat_lon(exif_data):
    """Extract latitude and longitude from EXIF data."""
    if "GPSInfo" in exif_data:  
        gps_info = exif_data["GPSInfo"]
        
        # Process GPS coordinates
        def convert_to_degrees(value):
            d = float(value[0])
            m = float(value[1])
            s = float(value[2])
            return d + (m / 60.0) + (s / 3600.0)

        lat = convert_to_degrees(gps_info["GPSLatitude"])
        lat_ref = gps_info["GPSLatitudeRef"]
        if lat_ref != "N":  
            lat = -lat

        lon = convert_to_degrees(gps_info["GPSLongitude"])
        lon_ref = gps_info["GPSLongitudeRef"]
        if lon_ref != "E":
            lon = -lon

        return lat, lon
    else:
        return None, None



# Example usage
"""
image_path = 'path/to/your/image.heic'  # Make sure to update this path
exif_data = get_exif_data(image_path)
latitude, longitude = get_lat_lon(exif_data)
if latitude and longitude:
    print(f"Latitude: {latitude}, Longitude: {longitude}")
else:
    print("No GPS data found.")
"""


def generate_loc_objects(start, end):
    for i in range(start, end + 1):
        print("""    {
        id: {i},
        difficulty: 1,
        type: "google",
        lat: 0,
        lng: 0,
        heading: 0,
        pitch: 0,
        zoom: 0,
    },""".format())