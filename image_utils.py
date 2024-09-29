import cv2
import numpy as np
from glob import glob
from os.path import join



def put_text(img, text):
    # Set the font type (you can choose from various fonts provided by OpenCV)
    font = cv2.FONT_HERSHEY_SIMPLEX

    # Set the font scale (adjust to make the text bigger or smaller)
    font_scale = 1  # Increase this value for bigger text

    # Set the text color (choose a contrasting color for visibility)
    text_color = (255, 255, 255)  # White color in BGR format

    # Set the thickness of the text
    thickness = 4  # Increase for thicker text

    # Get the width and height of the text box
    (text_width, text_height), baseline = cv2.getTextSize(text, font, font_scale, thickness)

    # Calculate the coordinates for centering the text
    x = (img.shape[1] - text_width) // 2
    y = (img.shape[0] + text_height) // 2

    # Add text to the image
    cv2.putText(img, text, (x, y), font, font_scale, text_color, thickness, cv2.LINE_AA)

    return img


def generetae_test_images():
    
    grid_size = 4
    height = 1080
    width = 1920
    channels = 3  # RGB image

    directions = ['N', 'E', 'S', 'W']

    for i in range(grid_size):
        for j in range(grid_size):
            for direction in directions:
                # Generate a random image
                random_color = np.random.randint(0, 256, size=(3,), dtype=np.uint8)
                image = np.zeros((height, width, channels), dtype=np.uint8)
                image[:] = random_color  # Set all pixels to the specified color

                name = f'area_{i}_{j}_{direction}'
                image = put_text(image, name)
                cv2.imwrite(f'images/{name}.jpg', image)


def resize_image(path, width=1920, height=1080):
    # Read the image using OpenCV
    img = cv2.imread(path)
    
    # Get the original dimensions
    original_height, original_width = img.shape[:2]
    
    # Calculate the aspect ratio
    aspect_ratio = original_width / original_height
    target_aspect_ratio = width / height
    
    # Determine new dimensions while keeping the aspect ratio
    if aspect_ratio > target_aspect_ratio:
        # Image is wider, fit by height
        new_height = height
        new_width = int(height * aspect_ratio)
    else:
        # Image is taller or equal, fit by width
        new_width = width
        new_height = int(width / aspect_ratio)
    
    # Resize the image
    img_resized = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_AREA)
    
    # Calculate the crop box for the center crop
    x_start = (new_width - width) // 2
    y_start = (new_height - height) // 2
    x_end = x_start + width
    y_end = y_start + height
    
    # Crop the center of the resized image
    img_cropped = img_resized[y_start:y_end, x_start:x_end]

    cv2.imwrite(path, img_cropped)


if __name__ == '__main__':
    
    # Resize image
    images_path = 'images'
    images_path_list = glob(join(images_path, '*.jpg'))
    for image_path in images_path_list:
        resize_image(path=image_path)

    # Generate images
    # generetae_test_images()
