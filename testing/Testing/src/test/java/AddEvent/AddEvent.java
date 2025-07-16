package AddEvent;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

public class AddEvent {
    WebDriver driver;

    @BeforeClass
    void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/login"); // Adjust path if different
        driver.findElement(By.id("username_input")).sendKeys("user");
        driver.findElement(By.id("password_input")).sendKeys("p@$$word");

        driver.findElement(By.id("password_input")).sendKeys(Keys.ENTER);
      /*  WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement test = wait.until(ExpectedConditions.elementToBeClickable(By.id("login_button")));
        test.click();*/
        driver.get("http://localhost:3000/addEvent"); // Adjust path if different

    }

    @Test(priority = 1)
    void testPageLoadAndLayout() throws InterruptedException {
        Thread.sleep(3000);
        WebElement logo = driver.findElement(By.tagName("img"));
        Assert.assertTrue(logo.isDisplayed());

        WebElement title = driver.findElement(By.id("page_title"));
        Assert.assertEquals(title.getText(), "Event Management");

        WebElement subtitle = driver.findElement(By.id("page_subtitle"));
        Assert.assertEquals(subtitle.getText(), "N S B E @ F I U");

        WebElement sectionHeader = driver.findElement(By.id("event_details_section_label"));
        Assert.assertEquals(sectionHeader.getText(), "Event Details");
    }

    @Test(priority = 2)
    void testFormFieldPresence() {
        Assert.assertTrue(driver.findElement(By.id("event_name")).isDisplayed());
        Assert.assertTrue(driver.findElement(By.id("event_type")).isDisplayed());
        Assert.assertTrue(driver.findElement(By.id("point_value")).isDisplayed());
        Assert.assertTrue(driver.findElement(By.id("id_list")).isDisplayed());
    }

    @Test(priority = 3)
    void testDropdownOptions() {
        WebElement dropdown = driver.findElement(By.id("event_type"));
        List<WebElement> options = dropdown.findElements(By.tagName("option"));
        String[] expected = {
                "Select Event Type",
                "General Body Meeting",
                "Study Hall",
                "Social",
                "Student Organization Collaboration",
                "Volunteer",
                "Signature",
                "Industry"
        };

        for (String label : expected) {
            boolean found = options.stream().anyMatch(opt -> opt.getText().equals(label));
            Assert.assertTrue(found, "Dropdown missing option: " + label);
        }
    }

    @Test(priority = 4)
    void testFieldInteractions() {
        driver.findElement(By.id("event_name")).sendKeys("Mock Event");
        driver.findElement(By.id("event_type")).sendKeys("Study Hall");
        driver.findElement(By.id("point_value")).clear();
        driver.findElement(By.id("point_value")).sendKeys("10");
        WebElement idTextBox= driver.findElement(By.id("id_list"));
        idTextBox.clear();
        idTextBox.sendKeys("1112222");

        Assert.assertEquals(driver.findElement(By.id("event_name")).getAttribute("value"), "Mock Event");
        Assert.assertEquals(driver.findElement(By.id("point_value")).getAttribute("value"), "10");
        Assert.assertEquals(driver.findElement(By.id("id_list")).getAttribute("value"), "1112222");
        idTextBox.clear();


    }

    @Test(priority = 5)
    void testEmptySubmissionHandling() {
        driver.findElement(By.id("event_name")).clear();
        driver.findElement(By.tagName("button")).click();
        WebElement error = driver.findElement(By.id("general_error_message"));
        Assert.assertTrue(error.isDisplayed());
    }

    @Test(priority = 6)
        //TODO: change error output layout
    void testInvalidPantherIdsDisplay() throws InterruptedException {
        driver.findElement(By.id("event_name")).clear();
        driver.findElement(By.id("event_name")).sendKeys("Invalid Event");
        driver.findElement(By.id("event_type")).sendKeys("Volunteer");
        driver.findElement(By.id("point_value")).clear();
        driver.findElement(By.id("point_value")).sendKeys("15");
        driver.findElement(By.id("id_list")).clear();
        driver.findElement(By.id("id_list")).sendKeys("badid1,badid2");

        driver.findElement(By.tagName("button")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        WebElement errorBox = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("error_message")));
        String msg = errorBox.getText();
        Assert.assertTrue(msg.contains("badid1"));
        Assert.assertTrue(msg.contains("badid2"));

    }



    @Test(priority = 7)
    void testSuccessfulSubmissionFeedback() throws InterruptedException {
        driver.findElement(By.id("event_name")).clear();
        driver.findElement(By.id("event_name")).sendKeys("Valid Event");
        driver.findElement(By.id("event_type")).sendKeys("General Body Meeting");
        driver.findElement(By.id("point_value")).clear();
        driver.findElement(By.id("point_value")).sendKeys("5");
        driver.findElement(By.id("id_list")).clear();
        driver.findElement(By.id("id_list")).sendKeys("1112222");
        driver.findElement(By.tagName("button")).click();
        Thread.sleep(1000);
        driver.switchTo().alert().accept(); // Accept JS alert
    }

    @Test(priority = 8)
    void testButtonBehavior() {
        WebElement button = driver.findElement(By.tagName("button"));
        Assert.assertTrue(button.isDisplayed());
        Assert.assertTrue(button.isEnabled());
    }

    @AfterTest
    void tearDown() {
        driver.findElement(By.id("AccountBoxIcon")).click();
        driver.findElement(By.id("signout_button")).click();
        driver.quit();
    }


}