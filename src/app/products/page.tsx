"use client";
import { Tabs, Tab } from "@nextui-org/Tabs";
import { Button } from "@nextui-org/Button";
import { Card, CardBody } from "@nextui-org/Card";

import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import axios from "axios";
import { useState, useEffect, SetStateAction } from "react";
import ProductCard from "@/components/product/ProductCard";
import { CustomCheckbox } from "@/components/ui/CustomCheckbox";
import useDeviceType from "@/hooks/useDeviceType";

// URL API
const API_URL = process.env.NEXT_PUBLIC_API_NODE_URL;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const ProductsPage = () => {
  const isMobile = useDeviceType();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "all"
  );
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: filters,
      });
      setProducts(response.data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategoriesAndTags = async () => {
    try {
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      setCategories(categoriesResponse.data.result);

      const tagsResponse = await axios.get(`${API_URL}/tags`);
      setTags(tagsResponse.data.result);
    } catch (error) {
      console.error("Error fetching categories and tags:", error);
    }
  };

  const handleFilterChange = () => {
    const filters: any = {};
    if (selectedCategory !== "all")
      filters.categoryId = Number(selectedCategory);
    if (selectedTags.length > 0) filters.tagIds = selectedTags;
    fetchProducts(filters);
  };

  useEffect(() => {
    fetchCategoriesAndTags();
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedTags]);

  const handleTagClick = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-6">
        Products Catalog
      </h1>
      {/* Select de Tags */}
      <div className="flex flex-col text-foreground-900 gap-1 w-full">
        {isMobile ? (
          <h1>hola</h1>
        ) : (
          <CheckboxGroup
            className="flex flex-row gap-5 bg-content1 p-4 rounded-2xl shadow-md bg-opacity-50  "
            label="Filter by Tag"
            orientation="horizontal"
            value={groupSelected}
            onChange={setGroupSelected}
          >
            {tags.map((tag) => (
              <CustomCheckbox key={tag.id} type={tag.name} value={tag.name} />
            ))}
          </CheckboxGroup>
        )}
        {/*     <p className="mt-4 ml-1 text-foreground-900">
          Selected: {groupSelected.join(", ")}
        </p> */}
      </div>
      {/* Tabs de Categorías */}
      <div className="mb-4">
        <Tabs
          aria-label="Categories Tabs"
          selectedKey={selectedCategory}
          onSelectionChange={(key: SetStateAction<string | number>) =>
            setSelectedCategory(key)
          }
        >
          <Tab key="all" title="All Categories">
            <div className="grid grid-cols-2 md:grid-cols-1  gap-2">
              {isMobile ? (
                products.map((product) => (
                  <div key={product.id} className="grid md:grid-cols-5">
                    <ProductCard
                    stock={product.stock}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={85.3}
                    discount={20}
                    sales={4000000}
                    rating={4.5}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    />
                  </div>
                ))
              ) : (
                <Card
                  isBlurred
                  className="border-none bg-background/60 dark:bg-default-100/50"
                >
                  <CardBody>
                    <div className="grid grid-cols-2  md:grid-cols-2  lg:grid-cols-6 gap-3">
                      {products.map((product) => (
                        <div key={product.id}>
                          <ProductCard
                            stock={product.stock}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            originalPrice={85.3}
                            discount={20}
                            sales={4000000}
                            rating={4.5}
                            description={product.description}
                            imageUrl={product.imageUrl}
                          />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </Tab>
          {categories.map((category) => (
            <Tab key={category.id} title={category.name}>
              {isMobile ? (
                products.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                    stock={product.stock}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={85.3}
                    discount={20}
                    sales={4000000}
                    rating={4.5}
                    description={product.description}
                    imageUrl={product.imageUrl}
                    />
                  </div>
                ))
              ) : (
                <Card
                  isBlurred
                  className="border-none bg-background/60 dark:bg-default-100/50"
                >
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div key={product.id}>
                          <ProductCard
                           stock={product.stock}
                           id={product.id}
                           name={product.name}
                           price={product.price}
                           originalPrice={85.3}
                           discount={20}
                           sales={4000000}
                           rating={4.5}
                           description={product.description}
                           imageUrl={product.imageUrl}
                          />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsPage;
