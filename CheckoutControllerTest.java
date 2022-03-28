package com.eliakin.ecommerce.controller;

import com.eliakin.ecommerce.dto.Purchase;
import com.eliakin.ecommerce.dto.PurchaseResponse;
import com.eliakin.ecommerce.entity.Address;
import com.eliakin.ecommerce.entity.Customer;
import com.eliakin.ecommerce.entity.Order;
import com.eliakin.ecommerce.entity.OrderItem;
import com.eliakin.ecommerce.service.CheckoutServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CheckoutControllerTest {

		@Mock
		private CheckoutServiceImpl checkoutServiceImpl;

		@InjectMocks
		private CheckoutController checkoutController;

		@Test
		void testPlaceOrder() {
			// given
			Purchase purchase = new Purchase();

			Customer customer = new Customer();
			customer.setId((long) 1);
			customer.setFirstName("Test");
			customer.setLastName("Dummy");
			customer.setEmail("testing@email.com");

			Address shippingAddress = new Address();
			shippingAddress.setId((long) 1);
			shippingAddress.setStreet("Dummy Street");
			shippingAddress.setCity("Dummy City");
			shippingAddress.setState("Dummy State");
			shippingAddress.setCountry("Dummy Country");
			shippingAddress.setZipCode("Dummy ZipCode");

			Address billingAddress = new Address();
			billingAddress.setId((long) 1);
			billingAddress.setStreet("Dummy Street");
			billingAddress.setCity("Dummy City");
			billingAddress.setState("Dummy State");
			billingAddress.setCountry("Dummy Country");
			billingAddress.setZipCode("Dummy ZipCode");

			Order order = new Order();
			order.setId((long) 1);
			order.setOrderTrackingNumber("032932476704");
			order.setTotalQuantity(1);
			order.setTotalPrice(BigDecimal.valueOf(7.99));
			order.setStatus("Arriving today by 3PM");
		
			OrderItem orderItem = new OrderItem();
			orderItem.setId((long) 1);
			orderItem.setImageUrl("dummy/image_url");
			orderItem.setUnitPrice(BigDecimal.valueOf(2.99));
			orderItem.setQuantity(1);
			orderItem.setProductId((long) 1);
			orderItem.setOrder(order);

			Set<OrderItem> orderItems = new HashSet<>();
			orderItems.add(orderItem);

			// when
			purchase.setOrderItems(orderItems);
			purchase.setCustomer(customer);
			purchase.setShippingAddress(shippingAddress);
			purchase.setBillingAddress(billingAddress);
			purchase.setOrder(order);
			
			PurchaseResponse response=new PurchaseResponse(order.getOrderTrackingNumber());

			// then
            Mockito.when((PurchaseResponse) checkoutServiceImpl.placeOrder(Mockito.any())).thenReturn(response);
            PurchaseResponse testIntent = checkoutController.placeOrder(purchase);
            assertEquals(response, testIntent);











		}
	}

